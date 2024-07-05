import { Socket } from "socket.io";


// Maybe extracting the whole payload
export function extractUserId(client: Socket) {
    return (client.handshake.auth.user.id);
}