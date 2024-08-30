import { Socket } from 'socket.io';
import { profileVisitNotificationHandler, userLikeNotificationHandler, userUnlikedNotificationHandler } from '../services/notification.service.js';
import { eventHandlerWithErrorHandler } from '../services/socket.service.js';


const profileVisitNotification = eventHandlerWithErrorHandler(profileVisitNotificationHandler);
const userLikeNotification = eventHandlerWithErrorHandler(userLikeNotificationHandler);
const userUnlikedNotification = eventHandlerWithErrorHandler(userUnlikedNotificationHandler);



export function registerNotificationHandlers(client: Socket) {
    // const userId = extractUserId(client);

    client.on("notification:like", (data) => userLikeNotification(client, data));
    // server.on("notification:like-back", (data) => userLikedBackNotification(client, data));
    client.on("notification:unlike", (data) => userUnlikedNotification(client, data));
    client.on("notification:visit", (data) => profileVisitNotification(client, data));
}
