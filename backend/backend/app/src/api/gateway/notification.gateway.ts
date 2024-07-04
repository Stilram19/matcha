import { Server, Socket } from 'socket.io';
import socketService from './socket.service.js';

enum EmittedEvents {
    LIKED = "notification:liked",
    LIKED_BACK = 'notification:liked-back',
    UNLIKED = 'notification:unliked',

}


function userLiked(server: Server, client: Socket, data: any, event: string) {
    // validate data, data should have the likedUserId.

    const userId = client.handshake.auth.user.id;
    const likedUserId = data.likedUserId as number;

    if (userId === likedUserId) { // or pairs already matched
        return ;
    }

    const likedUserSockets = socketService.getSockets(likedUserId);

    likedUserSockets?.forEach((socket) => {
        server.to(socket.id).emit(event, {likerId: userId});
    })

    /*
        likeModel.create new record with userId and likedUserId
    */
}

function userLikeNotification(server: Server, client: Socket, data: any) {
    userLiked(server, client, data, EmittedEvents.LIKED)
}

function userLikedBackNotification(server: Server, client: Socket, data: any) {
    userLiked(server, client, data, EmittedEvents.LIKED_BACK)
}

function userUnliked(server: Server, client: Socket, data: any) {
    const userId = client.handshake.auth.user.id;
    const unlikedUserId = data.unlikedUserId as number;
    const unlikedUserSockets = socketService.getSockets(unlikedUserId);

    unlikedUserSockets?.forEach((socket) => {
        server.to(socket.id).emit(EmittedEvents.UNLIKED, {unlikerId: userId});
    })

    // remove record
}


function registerNotificationHandlers(server: Server, client: Socket) {
    server.on("notification:like", (data) => userLikeNotification(server, client, data));
    server.on("notification:like-back", (data) => userLikedBackNotification(server, client, data));
    server.on("notification:unlike", (data) => userLikeNotification(server, client, data));
    server.on("notification:visit", (data) => userLikeNotification(server, client, data));
}
