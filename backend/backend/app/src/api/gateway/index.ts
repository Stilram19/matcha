import { Server, Socket } from "socket.io";
import registerChatHandlers from "./chat.gateway.js";
import { authMiddleware } from "../middlewares/socket.middleware.js";
import socketManager from "../services/socketManager.service.js";
import ioEmitter from "../services/emitter.service.js";
import { extractUserId } from "../services/socket.service.js";
import { registerNotificationHandlers } from "./notification.gateway.js";


type RegisterHandler = (client: Socket) => void;

function onConnection(client: Socket) {
    const userId = extractUserId(client);
    const registerHandlers: RegisterHandler[] = [registerChatHandlers, registerNotificationHandlers];

    console.log(`new Client userID ${userId} socketID ${client.id}`)

    socketManager.addSocket(userId, client);
    // Register all the socket listeners
    // registerChatHandlers(io, client);

    // Add more domain-specific handlers here
    registerHandlers.forEach((registerHandler) => {
        registerHandler(client);
    })
    
    client.broadcast.emit("global:online-users", {online_users: socketManager.getConnectedUsers()});

    client.on("disconnect", (reason) => {
        console.log(reason);    
        handleDisconnect(client);
    });
}


function handleDisconnect(socket: Socket) {
    const userId = extractUserId(socket);
    console.log(`Client userId ${userId}, socketId ${socket.id} disconnected`)
    socketManager.removeSocket(userId, socket);

    if (!socketManager.isUserOnline(userId))
        socket.broadcast.emit('global:online-users', {online_users: socketManager.getConnectedUsers()})
}


function createIoServer(server: any) {
    const io = new Server(server, {cors: {origin: "*"}});
    ioEmitter.initIoServer = io; // intisalize io Server


    io.use(authMiddleware); // ? authetication middleware that gets executed for every incoming connection for checking auth (JWT token)
    io.on('connection', (socket) => onConnection(socket));
}


export default createIoServer;