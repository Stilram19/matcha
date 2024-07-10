import { Socket } from "socket.io";


class SocketManager {
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

    getSocketsById(userId: number) {
        return this.sockets.get(userId);
    }

    getSockets() : Socket[] {
        let sockets: Socket[] = [];
    
        this.sockets.forEach((value, key) => {
            sockets.push(...value);   
        })

        return (sockets);
    }

    getConnectedUsers(): number[] {
        return Array.from(this.sockets.keys());
    }

    isUserOnline(userId: number) {
        return (this.sockets.has(userId));
    }
}


const socketManager = new SocketManager();

export default socketManager;
