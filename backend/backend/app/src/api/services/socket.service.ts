import { Socket } from "socket.io";
import { getApplicationError } from "../helpers/getErrorObject.js";
import socketManager from "./socketManager.service.js";


// Maybe extracting the whole payload
export function extractUserId(client: Socket) {
    return (client.handshake.auth.user.id);
}


type EventHandler = (client: Socket, data: any) => void;

export function eventHandlerWithErrorHandler(fn: EventHandler) {
    return  (client: Socket, data: any) => {
        try {
             fn(client, data);
        } catch (e) {
            const { message } = getApplicationError(e);
            console.log(message)
            client.emit('error', {message: message});
        }
    }
}


export function isUserOnline(userId: number) {
    return socketManager.isUserOnline(userId);
}