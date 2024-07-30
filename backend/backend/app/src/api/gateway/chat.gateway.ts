import { Server, Socket } from "socket.io";
import { eventHandlerWithErrorHandler, extractUserId, isUserOnline } from "../services/socket.service.js";
import { EmittedMessage } from "../types/chat.type.js";
import { validateMessageData } from "../validators/socketEventValidator.js";
import ioEmitter from '../services/emitter.service.js';
import { EmittedEvents } from '../types/enums.js';
import { ApplicationError } from "../helpers/ApplicationError.js";
import { checkRecordExistence } from "../services/chat.service.js";
import { isBlockedService } from "../services/profile.js";
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
interface    IUserBrief {
    id: any;
    firstName: any;
    lastName: any;
    profilePicture: any;
    status: boolean;
}

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
        status: isUserOnline(userId),
    };
}



function emitChatMessageEvent(user: IUserBrief, messageId: number, message: EmittedMessage, senderId: number) {
    const {id, firstName, lastName, profilePicture, status} = user;


    // ! what about the id of the dm???
    ioEmitter.emitToClientSockets(id, 'chat:message', {
        id: messageId,
        isSender: id === senderId,
        from: senderId,
        to: message.to,
        messageType: message.messageType,
        messageContent: message.messageContent,
        firstName: firstName,
        lastName: lastName,
        status: status,
    })

}

async function areMatched(userId1: number, userId2: number) {
    const   query = `SELECT CASE WHEN COUNT(*) = 2 THEN true ELSE false END AS are_matched
                    FROM user_likes
                    WHERE (liking_user_id, liked_user_id) IN (($1, $2), ($2, $1));
    `

    const client = await pool.connect();
    try {
        const results = await client.query(query, [userId1, userId2]);

        return (results.rowCount != null && results.rowCount > 0 && results.rows[0].are_matched === true);
    } catch (e) {
        throw e;
    } finally {
        client.release();
    }
}


async function createNewDm(senderId: number, receiverId: number, messageContent: any) {
    const   dmCreatationQuery = `INSERT INTO "dm"
                                (sender_id, receiver_id, content, status) values ($1, $2, $3, $4)
                                RETURNING id;`

    const dbClient = await pool.connect();

    try {
        const results = await dbClient.query(dmCreatationQuery, [senderId, receiverId, messageContent, 0]); // ? 0 for unread message
        return (results.rows[0].id);
    } catch (e) {
        throw (e);
    } finally {
        dbClient.release();
    }
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

    console.log('chat eventttttttt');
    console.log(receiverBreif);

    // audio part
    let audioFileName: string;
    if (message.messageType === 'audio') {
        // Asynchronously saving the file but synchronously validating the file mime
        audioFileName = await saveAudioFile(message.messageContent as ArrayBuffer, generateAudioFileName(senderId));
    }

    const senderBrief = await getUserBrief(senderId);

    // ! add message Type
    // !! audio handling using the Audio File LOCATION instead of the message content 
    const messageId = await createNewDm(senderId, receiverId, message.messageContent);

    console.log('emitting to pariticipants');
    emitChatMessageEvent(senderBrief!, messageId, message, senderId);
    emitChatMessageEvent(receiverBreif, messageId, message, senderId);

    ioEmitter.emitToClientSockets(receiverId, 'notification:new', {
        id: Math.floor(Math.random() * 1000),
        type: 'new_message',
        title: 'New Message',
        message: `You have received a new message from ${senderBrief?.firstName} ${senderBrief?.lastName}`,
        actorId: senderId,
        profilePicture: senderBrief?.profilePicture,
        senderFirstName: senderBrief?.firstName,
        senderLastName: senderBrief?.lastName,
        read: false
    })



}


// function    sendMessageHandler(client: Socket, data: any) {
//     // if (!validateMessageData(data)) { // Checking for the data type also
//     //     client.emit(EmittedEvents.ERROR, {data: "Invalid Message Data"});
//     //     return ;
//     // }

//     /*
//         if (!isUserExists(data.to) || isBlocked(data.to, client.handshake.user.id))
//             client.emit('error', {message: "User Not found"});
//     */
//     sendMessage(client, data);
// }

async   function messageExists(senderId: number, receiverId: number, messageId: number) {
    const client = await pool.connect();
    const checkingQuery = `SELECT EXISTS (
            SELECT 1 from "dm" WHERE id = $1 AND sender_id = $2 AND receiver_id = $3  
        ) AS message_exists
    `

    try {
        const res = await client.query(checkingQuery, [messageId, senderId, receiverId]);
        return (res.rows[0].message_exists);
    } catch (e) {
        throw e;
    } finally {
        client.release();
    }
}

async function MarkMessageAsRead(messageId: number) {
    const client = await pool.connect();
    const query = `UPDATE dm SET status = 1 WHERE id = $1` // 1 means the message was read

    try {
        const res = await client.query(query, [messageId]);
        console.log('message maked as read');
    } catch (e) {
        throw (e);
    } finally {
        client.release();
    }
}

async function handleMarkMessageAsRead(client: Socket, data: {participantId: number, messageId: number}) {
    const   {participantId, messageId} = data;
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
    // if (message does not exits return) // sender participantId receiver userId Where id = messageId.

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

