import { Socket } from "socket.io";
import { getApplicationError } from "../helpers/getErrorObject.js";
import socketManager from "./socketManager.service.js";
import { IDirectMessage, IUserBrief, OutgoingMessagePayload } from "../types/chat.type.js";
import ioEmitter from "./emitter.service.js";
import { INotification } from "../types/notification.type.js";


// Maybe extracting the whole payload
export function extractUserId(client: Socket) {
    return (client.handshake.auth.user.id);
}


type EventHandler = (client: Socket, data: any) => Promise<any>;

export function eventHandlerWithErrorHandler(fn: EventHandler) {
    return  async (client: Socket, data: any) => {
        try {
             await fn(client, data);
        } catch (e) {
            const { message } = getApplicationError(e);
            console.log(e);
            console.log('event handler wrapper')
            console.log(message)
            client.emit('error', {message: message});
        }
    }
}


export function isUserOnline(userId: number) {
    return socketManager.isUserOnline(userId);
}



// ! back to this
export function emitChatMessageEvent(senderId: number, receiverId: number, isSender: boolean, createdDm: IDirectMessage, user: IUserBrief) {
    const   {id, firstName, lastName, profilePicture, status } = user;

    const   outgoingMessage: OutgoingMessagePayload = {
        from: senderId,
        to: receiverId,
        isSender,
        firstName,
        lastName,
        profilePicture,
        status,
        messageId: createdDm.id,
        messageType: createdDm.messageType,
        messageContent: createdDm.messageContent,
        sentAt: createdDm.sentAt,
    }

    ioEmitter.emitToClientSockets(isSender ? senderId : receiverId, 'chat:message', outgoingMessage);
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

