import { Server, Socket } from "socket.io";
import { eventHandlerWithErrorHandler, extractUserId } from "../services/socket.service.js";
import { EmittedMessage } from "../types/chat.type.js";
import { validateMessageData } from "../validators/socketEventValidator.js";
import ioEmitter from '../services/emitter.service.js';
import { EmittedEvents } from '../types/enums.js';
import { ApplicationError } from "../helpers/ApplicationError.js";
import { checkIdExists } from "../services/chat.service.js";
import { isBlockedService } from "../services/profile.js";


function sendMessage(client: Socket, message: EmittedMessage) {
    const senderId = extractUserId(client);
    if (senderId === message.to)
        return ;

    ioEmitter.emitToClientSockets(message.to, 'chat:message', {
        from: senderId,
        message: message.message,
    })

    ioEmitter.emitToClientSockets(message.to, 'notification:new', {
        id: Math.floor(Math.random() * 1000),
        type: 'message',
        title: 'New Message',
        message: 'You have received a new message from John Doe',
        senderId: senderId,
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


function    sendMessageHandler(client: Socket, data: any) {
    if (!validateMessageData(data)) { // Checking for the data type also
        client.emit(EmittedEvents.ERROR, {data: "Invalid Message Data"});
        return ;
    }

    /*
        if (!isUserExists(data.to) || isBlocked(data.to, client.handshake.user.id))
            client.emit('error', {message: "User Not found"});
    */
    sendMessage(client, data);
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

