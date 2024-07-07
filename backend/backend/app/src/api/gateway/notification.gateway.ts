import { Server, Socket } from 'socket.io';
import { profileVisitNotificationHandler, userLikeNotificationHandler, userUnlikedNotificationHandler } from '../services/notification.service.js';
import { getApplicationError } from '../helpers/getErrorObject.js';



type EventHandler = (client: Socket, data: any) => void;

function withErrorHandler(fn: EventHandler) {
    return (client: Socket, data: any) => {
        try {
            fn(client, data);
        } catch (e) {
            const { message } = getApplicationError(e);
            client.emit('error', {message: message});
        }
    }
}


const profileVisitNotification = withErrorHandler(profileVisitNotificationHandler);
const userLikeNotification = withErrorHandler(userLikeNotificationHandler);
const userUnlikedNotification = withErrorHandler(userUnlikedNotificationHandler);



export function registerNotificationHandlers(client: Socket) {
    // const userId = extractUserId(client);

    client.on("notification:like", (data) => userLikeNotification(client, data));
    // server.on("notification:like-back", (data) => userLikedBackNotification(client, data));
    client.on("notification:unlike", (data) => userUnlikedNotification(client, data));
    client.on("notification:visit", (data) => profileVisitNotification(client, data));
}
