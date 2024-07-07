import { Server } from "socket.io";
import socketService from "./socketManager.service.js";


class   IoEmitter {
    private io_server: Server | null;

    constructor() {
        this.io_server = null;
    }

    set initIoServer(server: Server) {
        this.io_server = server;
    }

    get getIoServer() {
        if (!this.io_server) {
            // console.log("Server isn't initialized yet");
            throw Error("Socket.IO server is not initialized yet");
        }
        return this.io_server;
    }

    emitToClientSockets(userId: number, event:string, data: any) {
        if (!this.io_server)
            throw Error("Socket.IO server is not initialized yet");
        const sockets = socketService.getSockets(userId);
        const server: Server = this.io_server;
    
        sockets?.forEach((socket) => {
            server.to(socket.id).emit(event, data);
        })
    }
}


const ioEmitter = new IoEmitter();

export default ioEmitter;