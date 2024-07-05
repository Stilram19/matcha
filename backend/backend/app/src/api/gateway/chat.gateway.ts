import { Server, Socket } from "socket.io";
import { extractUserId } from "./socket.service.js";
import { EmittedMessage } from "../types/chat.type.js";
import { validateMessageData } from "./socketEventValidator.js";
import ioEmitter from './emitter.service.js';


function sendMessage(client: Socket, message: EmittedMessage) {
    const senderId = extractUserId(client);
    if (senderId === message.to)
        return ;

    ioEmitter.emitToClientSockets(message.to, 'chat:message', {
        from: senderId,
        message: message.message,
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
        client.emit('error', {data: "Invalid Message Data"});
        return ;
    }

    /*
        if (!isUserExists(data.to) || isBlocked(data.to, client.handshake.user.id))
            client.emit('error', {message: "User Not found"});
    */
    sendMessage(client, data);
}


function registerChatHandlers(io: Server, client: Socket) {
    io.on('chat:send', (data) => sendMessageHandler(client, data));
}


export default registerChatHandlers;

