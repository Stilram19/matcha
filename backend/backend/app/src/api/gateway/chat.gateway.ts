import { Server, Socket } from "socket.io";
import { eventHandlerWithErrorHandler, extractUserId } from "../services/socket.service.js";
import { EmittedMessage } from "../types/chat.type.js";
import { validateMessageData } from "../validators/socketEventValidator.js";
import ioEmitter from '../services/emitter.service.js';
import { EmittedEvents } from '../types/enums.js';
import { ApplicationError } from "../helpers/ApplicationError.js";
import { checkIdExists } from "../services/chat.service.js";
import { isBlockedService } from "../services/profile.js";
import { writeFile } from "fs";
import { fileTypeFromBuffer } from "file-type";
import path from "path";


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

    writeFile(path.join(path.resolve(), 'uploads', filename), view, (err) => {
        if (err) {
            console.log('write error:');
            console.log(err);
        }
    });
}

async function sendMessageHandler(client: Socket, message: EmittedMessage) {
    const senderId = extractUserId(client);
    if (senderId === message.to)
        return ;

    console.log(message);
    console.log('chat eventttttttt');
    if (message.messageType === 'audio') {
        // Asynchronously saving the file but synchronously validating the file mime
        await saveAudioFile(message.messageContent as ArrayBuffer, generateAudioFileName(senderId));
    }

    console.log('emitting to pariticipants');
    ioEmitter.emitToClientSockets(senderId, 'chat:message', {
        isSender: true,
        from: senderId,
        to: message.to,
        messageType: message.messageType,
        messageContent: message.messageContent,
        firstName: 'walid',
        lastName: 'khiarrrrr',
        status: 'online',
    })

    ioEmitter.emitToClientSockets(message.to, 'chat:message', {
        isSender: false,
        from: senderId,
        to: message.to,
        messageType: message.messageType,
        messageContent: message.messageContent,
        firstName: 'oussssaaaaama',
        lastName: 'khiarrrrr',
        status: 'online',
    })

    ioEmitter.emitToClientSockets(message.to, 'notification:new', {
        id: Math.floor(Math.random() * 1000),
        type: 'new_message',
        title: 'New Message',
        message: 'You have received a new message from John Doe',
        actorId: senderId,
        profilePicture: 'https://example.com/profiles/john-doe.jpg',
        senderFirstName: 'oussmaa',
        senderLastName: 'khiar',
        read: false
    })


    // Add message to the database
    /*
    dms.create({
        senderId: senderId,
        recieverId: message.to,
        message: message.message,
        created_at: Date.now(),
    })
    */
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


async function handleMarkMessageAsRead(client: Socket, data: {participantId: number, messageId: number}) {
    const   {participantId, messageId} = data;
    const   userId = extractUserId(client);
    if (!participantId || typeof participantId !== 'number'
            || !messageId || typeof messageId !== "number") {
        throw new ApplicationError('Invalid socket data for read event')
    }

    if (participantId === userId)
        return ; // ? do nothing
    if (!checkIdExists(participantId))
        throw new ApplicationError('user not found');
    if (await isBlockedService(userId, participantId))
        return ;
    // if (message does not exits return) // sender participantId receiver userId Where id = messageId.

    // commit to the database the changes. (status of the messageId)
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

