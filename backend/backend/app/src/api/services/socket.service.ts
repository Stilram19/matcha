import { Socket } from "socket.io";
import { getApplicationError } from "../helpers/getErrorObject.js";
import socketManager from "./socketManager.service.js";
import { EmittedMessage, IUserBrief } from "../types/chat.type.js";
import ioEmitter from "./emitter.service.js";
import { INotification } from "../types/notification.type.js";


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


export function emitChatMessageEvent(user: IUserBrief, messageId: number, message: EmittedMessage, senderId: number) {
    const {id, firstName, lastName, profilePicture, status} = user;

    ioEmitter.emitToClientSockets(id, 'chat:message', {
        id: messageId,
        isSender: id === senderId,
        from: senderId,
        to: message.to,
        messageType: message.messageType,
        messageContent: message.messageContent,
        firstName: firstName,
        lastName: lastName,
        profilePicture: profilePicture,
        status: status,
    })
}


export function emitNotificationEvent(notifierId: number, notification: INotification) {
    ioEmitter.emitToClientSockets(notifierId, 'notification:new', notification)
}



// export function emitNotificationEvent(notifificationType: string, notifierId: number, actorUser: IUserBrief) {
//     const   notifications = {
//         new_message: 
//     }
//     const   notification = 

//     ioEmitter.emitToClientSockets(notifierId, 'notification:new', {
//         id: Math.floor(Math.random() * 1000),
//         type: 'new_message',
//         title: 'New Message',
//         message: `You have received a new message from ${senderBrief?.firstName} ${senderBrief?.lastName}`,
//         actorId: senderId,
//         profilePicture: senderBrief?.profilePicture,
//         senderFirstName: senderBrief?.firstName,
//         senderLastName: senderBrief?.lastName,
//         read: false
//     })
// }


// class Notification {
//     private notificationType: string;
//     private notificaitonTitle: string;
//     private notificationMessage: string;
//     private notifierId: number;
//     private actorUser: IUserBrief;

//     constructor(type: string, title: string, message: string, notifierId: number, actorUser: string) {

//     }
// }

