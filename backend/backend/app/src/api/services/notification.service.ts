import { Socket } from "socket.io";
import { extractUserId } from "./socket.service.js";
import { isValidUserEventData } from "../validators/socketEventValidator.js";
import { UserEventData } from "../types/chat.type.js";
import { ApplicationError } from "../helpers/ApplicationError.js";
import ioEmitter from "./emitter.service.js";
import { EmittedEvents } from "../types/enums.js";


// function validateAndExtractUserId(client: Socket, data: UserEventData): { userId: number; targetUserId: number } {
//     if (!isValidUserEventData(data)) {
//         throw new ApplicationError('Invalid event data');
//     }
//     const userId = extractUserId(client);
//     const targetUserId = data.targetUserId;
//     return { userId, targetUserId };
// }


export function    profileVisitNotificationHandler(client: Socket, data: UserEventData) {
    // validate data object
    if (!isValidUserEventData(data))
        throw new ApplicationError('Invalid visit event data')

    const   userId = extractUserId(client);
    const   visitedProfileId = data.targetUserId;

    if (visitedProfileId === userId)
        return ;
    ioEmitter.emitToClientSockets(visitedProfileId, EmittedEvents.VISITED, {
        visitor: userId,
        title: 'visit',
        content: "you've been visited by ..."
    })

    // add to the history of the userId
}

export function userUnlikedNotificationHandler(client: Socket, data: UserEventData) {
    // validate data object
    if (!isValidUserEventData(data))
        throw new ApplicationError('Invalid visit event data')

    const   userId = extractUserId(client);
    const   unlikedUserId = data.targetUserId as number;

    if (unlikedUserId === userId) // !! or unlikeduserId doesn't exists or if the user has not previously liked the unlikedUserId
        return ;

    ioEmitter.emitToClientSockets(unlikedUserId, EmittedEvents.UNLIKED, {
        unlikerId: userId,
        title: 'unlike',
        content: `You've been unliked`,
    });


    // remove record
}



export function userLikeNotificationHandler(client: Socket, data: UserEventData) {
        // validate data, data should have the likedUserId.
        if (!isValidUserEventData(data))
            throw new ApplicationError('Invalid visit event data')

        const   userId = extractUserId(client);
        const   likedUserId = data.targetUserId;

        if (userId === likedUserId) { // or pairs already matched
            return ;
        }

        ioEmitter.emitToClientSockets(likedUserId, EmittedEvents.LIKED, {
            likerId: userId,
            title: 'liked',
            content: `You've been liked`, // checking for if it's a match
        });

        /*
            likeModel.create new record with userId and likedUserId
        */
}

// export const userLikeNotificationHandler = createLikeNotificationHandler(EmittedEvents.LIKED);
// export const userLikedBackNotificationHandler = createLikeNotificationHandler(EmittedEvents.LIKED_BACK);