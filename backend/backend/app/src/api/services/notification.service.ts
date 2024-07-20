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




// ? HTTP Services
export async function retrieveNotifications(userId: number) {

    // select all the notification of the userId and count the unseen notifications


    return [
        {
            id: 1,
            type: 'new_message',
            title: 'New Message',
            message: 'You have received a new message from John Doe',
            senderId: 123,
            profilePicture: 'https://example.com/profiles/john-doe.jpg',
            senderFirstName: 'John',
            senderLastName: 'Doe',
            read: false
        },
        {
            id: 2,
            type: 'like',
            title: 'New Like',
            message: 'Jane Doe liked your post',
            senderId: 124,
            profilePicture: 'https://example.com/profiles/jane-doe.jpg',
            senderFirstName: 'Jane',
            senderLastName: 'Doe',
            read: false
        },
        {
            id: 3,
            type: 'unlike',
            title: 'New Unlike',
            message: 'Alice Smith unliked your post',
            senderId: 125,
            profilePicture: 'https://example.com/profiles/alice-smith.jpg',
            senderFirstName: 'Alice',
            senderLastName: 'Smith',
            read: false
        },
        {
            id: 4,
            type: 'visited_your_profile',
            title: 'Profile Visit',
            message: 'Bob Johnson visited your profile',
            senderId: 126,
            profilePicture: 'https://example.com/profiles/bob-johnson.jpg',
            senderFirstName: 'Bob',
            senderLastName: 'Johnson',
            read: true
        },
        {
            id: 2,
            type: 'like',
            title: 'New Like',
            message: 'Jane Doe liked your post',
            senderId: 124,
            profilePicture: 'https://example.com/profiles/jane-doe.jpg',
            senderFirstName: 'Jane',
            senderLastName: 'Doe',
            read: false
        },
        {
            id: 3,
            type: 'unlike',
            title: 'New Unlike',
            message: 'Alice Smith unliked your post',
            senderId: 125,
            profilePicture: 'https://example.com/profiles/alice-smith.jpg',
            senderFirstName: 'Alice',
            senderLastName: 'Smith',
            read: false
        },
        {
            id: 4,
            type: 'visited_your_profile',
            title: 'Profile Visit',
            message: 'Bob Johnson visited your profile',
            senderId: 126,
            profilePicture: 'https://example.com/profiles/bob-johnson.jpg',
            senderFirstName: 'Bob',
            senderLastName: 'Johnson',
            read: true
        },
        {
            id: 1,
            type: 'new_message',
            title: 'New Message',
            message: 'You have received a new message from John Doe',
            senderId: 123,
            profilePicture: 'https://example.com/profiles/john-doe.jpg',
            senderFirstName: 'John',
            senderLastName: 'Doe',
            read: false
        },
        {
            id: 2,
            type: 'like',
            title: 'New Like',
            message: 'Jane Doe liked your post',
            senderId: 124,
            profilePicture: 'https://example.com/profiles/jane-doe.jpg',
            senderFirstName: 'Jane',
            senderLastName: 'Doe',
            read: false
        },
        {
            id: 3,
            type: 'unlike',
            title: 'New Unlike',
            message: 'Alice Smith unliked your post',
            senderId: 125,
            profilePicture: 'https://example.com/profiles/alice-smith.jpg',
            senderFirstName: 'Alice',
            senderLastName: 'Smith',
            read: false
        },
        {
            id: 4,
            type: 'visited_your_profile',
            title: 'Profile Visit',
            message: 'Bob Johnson visited your profile',
            senderId: 126,
            profilePicture: 'https://example.com/profiles/bob-johnson.jpg',
            senderFirstName: 'Bob',
            senderLastName: 'Johnson',
            read: true
        },
    ];
}