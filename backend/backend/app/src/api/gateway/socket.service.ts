import { Socket } from "socket.io";


class SocketService {
    private sockets: Map<number, Socket[]>;

    constructor() {
        this.sockets = new Map();
    }

    addSocket(userId: number, socket: Socket) {
        if (!this.sockets.has(userId))
            this.sockets.set(userId, []);
        this.sockets.get(userId)?.push(socket);
    }

    removeSocket(userId: number, socket: Socket) {
        if (!this.sockets.has(userId))
            return ;

        const userSockets = this.sockets.get(userId);
        if (userSockets) {
            this.sockets.set(userId, userSockets.filter(s => s.id !== socket.id));
            if (this.sockets.get(userId)?.length === 0)
                this.sockets.delete(userId);
        }
    }

    getSockets(userId: number) {
        return this.sockets.get(userId);
    }

    getConnectedUsers(): number[] {
        return Array.from(this.sockets.keys());
    }

    isUserOnline(userId: number) {
        return (this.sockets.has(userId));
    } 
}


const socketService = new SocketService();

export default socketService;
