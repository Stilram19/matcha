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


export async function    profileVisitNotificationHandler(client: Socket, data: UserEventData) {
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

export async function userUnlikedNotificationHandler(client: Socket, data: UserEventData) {
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



export async function userLikeNotificationHandler(client: Socket, data: UserEventData) {
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




// ? HTTP Services
export async function retrieveNotifications(userId: number) {

    // select all the notification of the userId and count the unseen notifications


    return [
        {
            id: 1,
            type: 'new_message',
            title: 'New Message',
            message: 'You have received a new message from John Doe',
            actorId: 123,
            actorPicture: '/imgs/man_placeholder1.jpg',
            actorFirstName: 'John',
            actorLastName: 'Doe',
            read: false
        },
        {
            id: 2,
            type: 'liked_you',
            title: 'New Like',
            message: 'Jane Doe liked your post',
            actorId: 124,
            actorPicture: '/imgs/man_placeholder.jpg',
            actorFirstName: 'Jane',
            actorLastName: 'Doe',
            read: false
        },
        {
            id: 3,
            type: 'unliked_you',
            title: 'New Unlike',
            message: 'Alice Smith unliked your post',
            actorId: 125,
            actorPicture: '/imgs/man_placeholder2.jpg',
            actorFirstName: 'Alice',
            actorLastName: 'Smith',
            read: false
        },
        {
            id: 4,
            type: 'profile_visit',
            title: 'Profile Visit',
            message: 'Bob Johnson visited your profile',
            actorId: 126,
            actorPicture: '/imgs/man_placeholder3.jpg',
            actorFirstName: 'Bob',
            actorLastName: 'Johnson',
            read: true
        },
        {
            id: 2,
            type: 'liked_you',
            title: 'New Like',
            message: 'Jane Doe liked your post',
            actorId: 124,
            actorPicture: '/imgs/test.jpg',
            actorFirstName: 'Jane',
            actorLastName: 'Doe',
            read: false
        },
        {
            id: 3,
            type: 'unliked_you',
            title: 'New Unlike',
            message: 'Alice Smith unliked your post',
            actorId: 125,
            actorPicture: '/imgs/man_placeholder2.jpg',
            actorFirstName: 'Alice',
            actorLastName: 'Smith',
            read: false
        },
        {
            id: 4,
            type: 'profile_visit',
            title: 'Profile Visit',
            message: 'Bob Johnson visited your profile',
            actorId: 126,
            actorPicture: '/imgs/test.jpg',
            actorFirstName: 'Bob',
            actorLastName: 'Johnson',
            read: true
        },
        {
            id: 1,
            type: 'new_message',
            title: 'New Message',
            message: 'You have received a new message from John Doe',
            actorId: 123,
            actorPicture: '/imgs/man_placeholder1.jpg',
            actorFirstName: 'John',
            actorLastName: 'Doe',
            read: false
        },
        {
            id: 2,
            type: 'liked_you',
            title: 'New Like',
            message: 'Jane Doe liked your post',
            actorId: 124,
            actorPicture: '/imgs/test.jpg',
            actorFirstName: 'Jane',
            actorLastName: 'Doe',
            read: false
        },
        {
            id: 3,
            type: 'unliked_you',
            title: 'New Unlike',
            message: 'Alice Smith unliked your post',
            actorId: 125,
            actorPicture: '/imgs/test.jpg',
            actorFirstName: 'Alice',
            actorLastName: 'Smith',
            read: false
        },
        {
            id: 4,
            type: 'profile_visit',
            title: 'Profile Visit',
            message: 'Bob Johnson visited your profile',
            actorId: 126,
            actorPicture: '/imgs/test.jpg',
            actorFirstName: 'Bob',
            actorLastName: 'Johnson',
            read: true
        },
    ];
}