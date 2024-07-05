import { Server, Socket } from 'socket.io';
import { extractUserId } from './socket.service.js';
import ioEmitter from './emitter.service.js';

enum EmittedEvents {
    LIKED = "notification:liked",
    LIKED_BACK = 'notification:liked-back',
    UNLIKED = 'notification:unliked',
    VISITED = 'notification:visit',
}


function createLikeNotificationHandler(event: string) {
    return (client: Socket, data: any) => {
        // validate data, data should have the likedUserId.
        const   userId = extractUserId(client);
        const   likedUserId = data.likedUserId as number;

        if (userId === likedUserId) { // or pairs already matched
            return ;
        }

        ioEmitter.emitToClientSockets(likedUserId, event, {
            likerId: userId,
            title: (event === EmittedEvents.LIKED) ? 'liked' : 'match',
            content: `You've been liked`, // checking for if it's a match
        });

        /*
            likeModel.create new record with userId and likedUserId
        */
    }
}

const userLikeNotification = createLikeNotificationHandler(EmittedEvents.LIKED);
const userLikedBackNotification = createLikeNotificationHandler(EmittedEvents.LIKED_BACK);

function userUnlikedNotification(client: Socket, data: any) {
    // validate data object

    const   userId = extractUserId(client);
    const   unlikedUserId = data.unlikedUserId as number;

    if (unlikedUserId === userId) // !! or unlikeduserId doesn't exists or if the user has not previously liked the unlikedUserId
        return ;

    ioEmitter.emitToClientSockets(unlikedUserId, EmittedEvents.UNLIKED, {
        unlikerId: userId,
        title: 'unlike',
        content: `You've been unliked`,
    });


    // remove record
}


function    profileVisitNotification(client: Socket, data: any) {
    // validate data object

    const   userId = extractUserId(client);
    const   visitedProfileId = data.visitedProfileId as number;

    if (visitedProfileId === userId)
        return ;
    ioEmitter.emitToClientSockets(visitedProfileId, EmittedEvents.VISITED, {
        visitor: userId,
        title: 'visit',
        content: "you've been visited by ..."
    })

    // add to the history of the userId
}


export function registerNotificationHandlers(server: Server, client: Socket) {
    // const userId = extractUserId(client);

    server.on("notification:like", (data) => userLikeNotification(client, data));
    server.on("notification:like-back", (data) => userLikedBackNotification(client, data));
    server.on("notification:unlike", (data) => userUnlikedNotification(client, data));
    server.on("notification:visit", (data) => profileVisitNotification(client, data));
}
