import { Server, Socket } from "socket.io";
import socketService from "./socket.service.js";
import { EmittedMessage } from "../types/chat.type.js";
import { validateMessageData } from "./chat.validator.js";


function sendMessage(server: Server, client: Socket, message: EmittedMessage) {
    const senderId = client.handshake.auth.user.id;

    if (senderId === message.to)
        return ;

    const receiverSockets = socketService.getSockets(message.to);

    receiverSockets?.forEach((receiverSocket) => {
        console.log(`send to userID ${message.to} with socketID ${receiverSocket.id}`);
        server.to(receiverSocket.id).emit('chat:message', {
            from: senderId,
            message: message.message,
        })
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


function    sendMessageHandler(server: Server, client: Socket, data: any) {
    if (!validateMessageData(data)) { // Checking for the data type also
        client.emit('error', {data: "Invalid Message Data"});
        return ;
    }

    /*
        if (!isUserExists(data.to) || isBlocked(data.to, client.handshake.user.id))
            client.emit('error', {message: "User Not found"});
    */

    sendMessage(server, client, data);
}


function registerChatHandlers(io: Server, client: Socket) {
    io.on('chat:send', (data) => sendMessageHandler(io, client, data));
}


export default registerChatHandlers;

