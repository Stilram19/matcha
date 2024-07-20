import { Socket } from "socket.io";


export function authMiddleware(socket: Socket, next: any) {
    const token = socket.handshake.auth.token;

    console.log(socket.handshake);
    console.log(`token: ${JSON.stringify(token)}`)
    if (!token) {
        socket.emit('error', {msg: "Authentication error"})
        next(new Error("Auth error"))
    }

    // valdiate jwt token and extract the payload object
    socket.handshake.auth.user = {id: token}; // ! replace with jwt payload object
    next();
}