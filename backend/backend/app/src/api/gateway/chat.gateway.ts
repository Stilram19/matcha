import { Socket } from "socket.io";
import { emitChatMessageEvent, emitNotificationEvent, eventHandlerWithErrorHandler, extractUserId, isUserOnline } from "../services/socket.service.js";
import { EmittedMessage, IUserBrief } from "../types/chat.type.js";
import { validateMessageData } from "../validators/socketEventValidator.js";
import ioEmitter from '../services/emitter.service.js';
import { ApplicationError } from "../helpers/ApplicationError.js";
import { areMatched, checkRecordExistence, createNewDm, createNewNotification, MarkMessageAsRead, messageExists } from "../services/chat.service.js";
import { writeFile } from "fs";
import { fileTypeFromBuffer } from "file-type";
import path from "path";
import pool from "../model/pgPoolConfig.js";


async function    validateUploadedFile(view: Uint8Array) {
    const   type = await fileTypeFromBuffer(view)
    console.log(type)
    return (type && type.mime === 'video/webm');
}

function generateAudioFileName(userId: number) {
    let fileName: string;

    fileName = `audio-${Date.now()}_${userId}.wav`
    return (fileName);
}

async function saveAudioFile(audioData: ArrayBuffer, filename: string) {
    const view = new Uint8Array(audioData);

    if (!await validateUploadedFile(view))
        throw new ApplicationError('Invalid audio file type. Please upload a WAV file.');

    let audioFileName = `uploads/${filename}`;

    writeFile(path.join(path.resolve(), 'uploads', filename), view, (err) => {
        if (err) {
            console.log('write error:');
            console.log(err);
        }
    });
    return (filename);
}

// helper function
async function getUserBrief(userId: number) {
    const client = await pool.connect();

    const query = `SELECT id, first_name, last_name, username, profile_picture FROM "user" WHERE id = $1;`
    const results = await client.query(query, [userId]);
    if (results.rowCount === 0)
        return (undefined);
    const user = results.rows[0];
    return {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        profilePicture: process.env.BASE_URL + '/' + user.profile_picture,
        status: (isUserOnline(userId) ? 'online' : 'offline') as 'online' | 'offline',
    };
}

async   function messagePersistencyHandler(senderId: number, receiverId: number, messageType: string, messageContent: string | ArrayBuffer) {
    let audioFileName: string;

    if (messageType === 'audio') {
        // Asynchronously saving the file but synchronously validating the file mime
        audioFileName = await saveAudioFile(messageContent as ArrayBuffer, generateAudioFileName(senderId));
    }

    // if type is audio then content will be the audio file
    const messageId = await createNewDm(senderId, receiverId, messageContent)
    return (messageId)
}

async function sendMessageHandler(client: Socket, message: EmittedMessage) {
    const   senderId = extractUserId(client);
    const   receiverId = message.to;

    // !! validate the emitted object
    if (senderId === receiverId)
        return ;

    let receiverBreif = await getUserBrief(receiverId);
    if (!receiverBreif)
        throw new ApplicationError('User not found');

    // checking if they are matched
    if (!await areMatched(senderId, receiverId))
        throw new ApplicationError('you\'re not matched');

    console.log(receiverBreif);
    const senderBrief = await getUserBrief(senderId);

    const   messageId = await messagePersistencyHandler(senderId, receiverId, message.messageType, message.messageContent)
    // const messageId = await createNewDm(senderId, receiverId, message.messageContent);
    console.log('emitting to pariticipants');
    emitChatMessageEvent(senderBrief!, messageId, message, senderId);
    emitChatMessageEvent(receiverBreif, messageId, message, senderId);


    const notification = await createNewNotification(receiverId, senderId, 'new_message');
    emitNotificationEvent(receiverId, notification);

}

async function handleMarkMessageAsRead(client: Socket, data: {participantId: number, messageId: number}) {
    const   { participantId, messageId } = data;
    const   userId = extractUserId(client);

    if (!participantId || typeof participantId !== 'number'
            || !messageId || typeof messageId !== "number") {
        throw new ApplicationError('Invalid socket data for read event')
    }

    if (participantId === userId)
        return ; // ? do nothing
    if (!await areMatched(userId, participantId))
        throw new ApplicationError('you\'re not matched');

    if (!await messageExists(participantId, userId, messageId))
        throw new ApplicationError('message does not exists');

    // commit to the database the changes. (status of the messageId)
    await MarkMessageAsRead(messageId);
}





function registerChatHandlers(client: Socket) {
    client.on('chat:send', (data) => eventHandlerWithErrorHandler(sendMessageHandler)(client, data));
    client.on('chat:markAsRead', (data) => eventHandlerWithErrorHandler(handleMarkMessageAsRead)(client, data));


    // ! testing => remove later
    client.on('chat:error', () => {
        const senderId = extractUserId(client);
    
        ioEmitter.emitToClientSockets(senderId, 'error', {
            error: "blahblahbl jsgdk"
        })
    });
}


export default registerChatHandlers;