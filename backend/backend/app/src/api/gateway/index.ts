import { Server, Socket } from "socket.io";
import registerChatHandlers from "./chat.gateway.js";
import { authMiddleware } from "./socket.middleware.js";
import socketService from "./socket.service.js";
import registerGlobalHandlers from "./global.gateway.js";

type RegisterHandler = (io: Server, client: Socket) => void;

function onConnection(io: Server, client: Socket) {
    const userId = client.handshake.auth.user.id;
    const handlerRegisters: RegisterHandler[] = [registerChatHandlers, registerGlobalHandlers];

    socketService.addSocket(userId, client);
    // Register all the socket listeners
    // registerChatHandlers(io, client);

    // Add more domain-specific handlers here
    handlerRegisters.forEach((handlerRegister) => {
        handlerRegister(io, client);
    })

    client.broadcast.emit("global:online-users", {online_users: socketService.getConnectedUsers()});
}

function handleDisconnect(socket: Socket) {
    const userId = socket.handshake.auth.user.id;
    console.log(`Client userId ${userId}, socketId ${socket.id} disconnected`)
    socketService.removeSocket(userId, socket);

    if (!socketService.isUserOnline(userId))
        socket.broadcast.emit('global:online-users', {online_users: socketService.getConnectedUsers()})
}


function createIoServer(server: any) {
    const io = new Server(server, {});

    io.use(authMiddleware)
    io.on('connection', (socket) => onConnection(io, socket));
    io.on("disconnect", handleDisconnect);
}

// function emitter(server: Server) {
//     return (receiverId: number, data: any, event: string) => {
//         const sockets = socketService.getSockets(receiverId);
        
//         sockets?.forEach((socket) => {
//             console.log(`send to user with socketID ${socket.id}`);
//             server.to(socket.id).emit(event, data)
//         })
//     }
// }


export default createIoServer;