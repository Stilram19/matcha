import { Server, Socket } from "socket.io";
import registerChatHandlers from "./chat.gateway.js";
import { authMiddleware } from "./socket.middleware.js";
import socketManager from "./socket.manager.service.js";
import ioEmitter from "./emitter.service.js";
import { extractUserId } from "./socket.service.js";
import { registerNotificationHandlers } from "./notification.gateway.js";


type RegisterHandler = (io: Server, client: Socket) => void;

function onConnection(io: Server, client: Socket) {
    const userId = extractUserId(client);
    const handlerRegisters: RegisterHandler[] = [registerChatHandlers, registerNotificationHandlers];

    socketManager.addSocket(userId, client);
    // Register all the socket listeners
    // registerChatHandlers(io, client);

    // Add more domain-specific handlers here
    handlerRegisters.forEach((handlerRegister) => {
        handlerRegister(io, client);
    })

    client.broadcast.emit("global:online-users", {online_users: socketManager.getConnectedUsers()});
}


function handleDisconnect(socket: Socket) {
    const userId = extractUserId(socket);
    console.log(`Client userId ${userId}, socketId ${socket.id} disconnected`)
    socketManager.removeSocket(userId, socket);

    if (!socketManager.isUserOnline(userId))
        socket.broadcast.emit('global:online-users', {online_users: socketManager.getConnectedUsers()})
}


function createIoServer(server: any) {
    const io = new Server(server, {});
    ioEmitter.initIoServer = io; // intisalize io Server

    io.use(authMiddleware)
    io.on('connection', (socket) => onConnection(io, socket));
    io.on("disconnect", handleDisconnect);
}


export default createIoServer;