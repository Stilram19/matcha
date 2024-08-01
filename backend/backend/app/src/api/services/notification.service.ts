import { Socket } from "socket.io";
import { extractUserId } from "./socket.service.js";
import { isValidUserEventData } from "../validators/socketEventValidator.js";
import { UserEventData } from "../types/chat.type.js";
import { ApplicationError } from "../helpers/ApplicationError.js";
import ioEmitter from "./emitter.service.js";
import { ACTOR_NAME_PLACEHOLDER, EmittedEvents } from "../types/enums.js";
import pool from "../model/pgPoolConfig.js";
import { INotification } from "../types/notification.type.js";


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


export async function getNotificationDetailsByType(notificationType: string) {
    const   client = await pool.connect();
    
    const query = `SELECT id, title, type, description
                FROM "notification_types"
                WHERE type = $1;
    `
    let notificationDetails : {id: number, title: string, type: string, description: string};

    try {
        const results = await client.query(query, [notificationType])
    
        if (results.rowCount === 0)
            throw new ApplicationError('notificaiton type not found');

        notificationDetails = results.rows[0];
        return (notificationDetails);
    } catch (e) {
        throw e;
    } finally {
        client.release();
    }
}


// ? helper function
export function substituteActorInNotificationDesc(description: string, fullname: string) : string {
    return (description.replace(ACTOR_NAME_PLACEHOLDER, fullname));
}



// ? HTTP Services
// SORT NOTIFICATION BY the creatation time
export async function retrieveNotifications(userId: number): Promise<INotification[]> {

    /*
        id: number;
    type: string;
    title: string;
    message: string;
    actorId: number;
    profilePicture: string;
    firstName: string;
    lastName: string;
    notificationStatus: boolean; // read (true)/unread
    */
    // select all the notification of the userId and count the unseen notifications
    const   query = `
            SELECT
                n.id,
                n.actor_id,
                u.first_name,
                u.last_name,
                u.profile_picture,
                nt.type,
                nt.title,
                nt.description,
                n.status
            FROM "notifications" n
            JOIN "notification_types" nt
                ON n.notification_type_id = nt.id
            JOIN "user" u
                ON u.id = n.actor_id
            WHERE notifier_id = $1
            LIMIT 20
        `;
        // ORDER BY n.created_at DESC

    const client = await pool.connect();

    let   results;
    try {
        results = await client.query(query, [userId]);
    } catch (e) {
        throw (e);
    } finally {
        client.release();
    }

    const mappedResults: INotification[] = results.rows.map((notification) => ({
        id: notification.id,
        type: notification.type,
        title: notification.title,
        message: substituteActorInNotificationDesc(notification.description, `${notification.first_name} ${notification.last_name}`),
        actorId: notification.id,
        firstName: notification.first_name,
        lastName: notification.last_name,
        profilePicture: process.env.BASE_URL + '/' + notification.profile_picture,
        notificationStatus: notification.status,
    }))

    return (mappedResults);
}


export  async function notificationMarkAsReadService(userId: number) {
    const query = `
                UPDATE "notifications"
                SET status = true
                WHERE notifier_id = $1;
    `
    const   client = await pool.connect();

    try {
        await client.query(query, [userId]);
        console.log(`notification read by userId ${userId}`);
    } catch (e) {
        throw (e);
    } finally {
        client.release();
    }

}