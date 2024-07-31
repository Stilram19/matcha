import { ApplicationError } from "../helpers/ApplicationError.js";
import { dummyDms } from "../helpers/dummyDms.js";
import HttpError from "../helpers/HttpError.js";
import { execute } from "../model/execute.js";
import pool from "../model/pgPoolConfig.js";
import { IUserBrief } from "../types/chat.type.js";
import { INotification } from "../types/notification.type.js";
import { isBlockedService } from "./profile.js";
import { isUserOnline } from "./socket.service.js";

// type DmListType = {
//     id: number,
//     username: string,
//     first_name: string,
//     last_name: string,
//     last_message: string,
//     status: 'online' | 'offline',
//     msg_created_at: Date,
// }


// export async function checkIdExists(id: number) {
//     const   query = `SELECT EXISTS (
//         SELECT 1 from "user" WHERE id = $1
//     ) AS id_exists`;

//     const   client = await pool.connect();

//     try {
//         const res = await client.query(query, [id]);
//         return (res.rows[0].id_exists as boolean);
//     } catch (e) {
//         throw e;
//     } finally {
//         client.release();
//     }
// }

export async function checkRecordExistence(table: string, recordId: number) {
    const query = `SELECT EXISTS (
            SELECT 1 FROM "${table}" WHERE id = $1
        ) AS id_exists
    `

    const client = await pool.connect();

    try {
        const res = await client.query(query, [recordId])
        return (res.rows[0].id_exists);
    } catch (e) {
        throw e;
    } finally {
        client.release();
    }
}

export async function getContactsService(userId: number) {
    let client = await pool.connect();

    const   retrieveQuery = `
                        SELECT u.id, first_name, last_name, username, profile_picture
                        FROM (
                            SELECT CASE WHEN user1 = $1 THEN user2 ELSE user1 END as matched_user_id
                            FROM (
                                SELECT GREATEST(liking_user_id, liked_user_id) as user1, LEAST(liking_user_id, liked_user_id) as user2
                                FROM user_likes
                                WHERE liking_user_id = $1 or liked_user_id = $1
                                GROUP BY user1, user2
                                HAVING COUNT(*) = 2
                            )
                        )
                        JOIN "user" u
                        ON u.id = matched_user_id
                        ORDER BY first_name, last_name;
    `

    const results = await client.query(retrieveQuery, [userId]);
    client.release();

    return  results.rows.map(contact => ({
        id: contact.id,
        firstName: contact.first_name,
        lastName: contact.last_name,
        username: contact.username,
        profilePicture: `${process.env.BASE_URL}/${contact.profile_picture}`,
        status: isUserOnline(userId) ? 'online' : 'offline',
    }));
}


export async function retrieveDms(userId: number) {
    const   query = `
        WITH latest_messages as (
            SELECT
                GREATEST(sender_id, receiver_id) as user1,
                LEAST(sender_id, receiver_id) as user2,
                MAX(sent_at) as sent_at
            FROM "dm"
            WHERE sender_id = $1 OR receiver_id = $1
            GROUP BY user1, user2
        )
        SELECT
            d.sender_id, d.receiver_id, d.content,
            u.id,
            u.username,
            u.first_name,
            u.last_name,
            u.profile_picture,
            CASE
                WHEN d.sender_id = $1
                THEN true
                ELSE false
            END AS is_sender
        FROM "dm" d
        JOIN latest_messages l
            ON d.sent_at = l.sent_at
                AND ((d.receiver_id = l.user1 AND d.sender_id = l.user2)
                    OR (d.receiver_id = l.user2 AND d.sender_id = l.user1))
        JOIN "user" u
            ON u.id != $1
                AND (u.id IN (sender_id, receiver_id))
        ORDER BY d.sent_at DESC
                `
            //     CASE
            //     WHEN uf.id IS NULL
            //     THEN false
            //     ELSE true
            // END AS is_favorite
                // LEFT JOIN user_favorites uf
                //     ON uf.user_id = $1
                //         AND uf.fav_id = u.id

    const client = await pool.connect();


    try {
        const results = await client.query(query, [userId]);
        console.log("dmssssssssssss")
        console.log(results.rows);

        // ! Adding is it online
        return (results.rows.map((dm) => ({
            id: dm.id,
            username: dm.username,
            firstName: dm.first_name,
            lastName: dm.last_name,
            lastMessage: dm.content,
            unreadCount: 2,
            status: isUserOnline(dm.id) ? 'online' : 'offline',
            profilePicture: process.env.BASE_URL + '/' + dm.profile_picture,
            isSender: dm.is_sender
        })));
    } catch (e) {
        console.log(e)
        throw e;
    } finally {
        client.release();
    }

}


export async function getChatHistory(userId: number, participantId: number) {
    if (await isBlockedService(participantId, userId))
        throw new HttpError(403, 'Forbidden');

// get Conversation history with the participant id, and set the unread messages to read 
    const   client = await pool.connect();

    // ! add dms offset in the api call
    const   query = `
            SELECT
                id,
                content,
                sent_at,
                CASE
                    WHEN sender_id = $1
                    THEN true
                    ELSE false
                END AS is_sender
            FROM "dm"
            WHERE
                (receiver_id, sender_id) IN (($1, $2), ($2, $1))
            ORDER BY sent_at DESC
            LIMIT 20
        `

    try {
        const results = await client.query(query, [userId, participantId]);
        
        console.log(results.rows);
        return (results.rows.map((chat) => ({
            id: chat.id,
            messageContent: chat.content,
            sentAt: chat.sent_at,
            messageType: 'text',
            isSender: chat.is_sender,
        })).reverse());
    } catch (e) {
        throw e;
    } finally {
        client.release();
    }

}


export async function getContactDetails(participant: number) {
    // if (!await checkRecordExistence('user', participant)) {
    //     throw new HttpError(404, 'User Id not found');
    // }

    const query = `
            SELECT
                id,
                username,
                first_name,
                last_name,
                profile_picture,
                biography,
            FROM "user"
            WHERE id = $1;
        `

    // find the user #participant
    // mark all messages as read
    const client = await pool.connect();

    try {
        const results = await client.query(query, [participant]);

        return results.rows[0];
    } catch (e) {
        throw e;
    } finally {
        client.release();
    }
}

export async function getParticipantInfoById(participant: number) {
    // checking user existance

    return {
        id: 1,
        username: 'okhiar',
        first_name: 'oussama',
        last_name: 'khiar',
        profile_picture: '/imgs/man_placeholder.jpg',
        status: 'online',
    }
}

export async function getFavoriteUsers(userId: number) {
    // select * from favorites WHERE user_id = userId JOIN with users on favorite_user_id = users.id

    return dummyDms.filter((value) => value.isFavorite);
}







// ? CHAT GATEWAY SERVICE
export async   function messageExists(senderId: number, receiverId: number, messageId: number) {
    const client = await pool.connect();
    const checkingQuery = `SELECT EXISTS (
            SELECT 1 from "dm" WHERE id = $1 AND sender_id = $2 AND receiver_id = $3  
        ) AS message_exists
    `

    try {
        const res = await client.query(checkingQuery, [messageId, senderId, receiverId]);
        return (res.rows[0].message_exists);
    } catch (e) {
        throw e;
    } finally {
        client.release();
    }
}

export async function MarkMessageAsRead(messageId: number) {
    const client = await pool.connect();
    const query = `UPDATE dm SET status = 1 WHERE id = $1` // 1 means the message was read

    try {
        const res = await client.query(query, [messageId]);
        console.log('message maked as read');
    } catch (e) {
        throw (e);
    } finally {
        client.release();
    }
}


export async function createNewDm(senderId: number, receiverId: number, messageContent: any) {
    const   dmCreatationQuery = `INSERT INTO "dm"
                                (sender_id, receiver_id, content, status) values ($1, $2, $3, $4)
                                RETURNING id;`

    const dbClient = await pool.connect();

    try {
        const results = await dbClient.query(dmCreatationQuery, [senderId, receiverId, messageContent, 0]); // ? 0 for unread message
        return (results.rows[0].id);
    } catch (e) {
        throw (e);
    } finally {
        dbClient.release();
    }
}


export async function areMatched(userId1: number, userId2: number) {
    const   query = `SELECT CASE WHEN COUNT(*) = 2 THEN true ELSE false END AS are_matched
                    FROM user_likes
                    WHERE (liking_user_id, liked_user_id) IN (($1, $2), ($2, $1));
    `

    const client = await pool.connect();
    try {
        const results = await client.query(query, [userId1, userId2]);

        return (results.rowCount != null && results.rowCount > 0 && results.rows[0].are_matched === true);
    } catch (e) {
        throw e;
    } finally {
        client.release();
    }
}


export async function getNotificationDetailsByType(notificationType: string) {
    const   client = await pool.connect();
    
    const query = `SELECT id, title, type, description
                FROM "notification_type"
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

export async function createNewNotification(notifierId: number, actorUser: IUserBrief, notificationType: string): Promise<INotification> {
    const   client = await pool.connect();

    const query = `INSERT INTO "notifications"
                    (actor_id, notifier_id, notification_type_id, status)
                    VALUES ($1, $2, $3, $4)
                    RETURNING id;
            `

    try {
        const notificationDetails = await getNotificationDetailsByType(notificationType);
        const notificationResult = await client.query(query, [actorUser.id, notifierId, notificationDetails.id, 0]); // 0 means not read yet
        const createdNotification = notificationResult.rows[0];

        return {
            id: createdNotification.id as number,
            type: notificationDetails.type as string,
            title: notificationDetails.title as string,
            message: `${notificationDetails.description} ${actorUser.firstName} ${actorUser.lastName}` as string,
            actorId: actorUser.id,
            profilePicture: actorUser.profilePicture,
            actorFirstName: actorUser.firstName,
            actorLastName: actorUser.lastName,
            read: false,
        };

    } catch (e) {
        throw e;
    } finally {
        client.release();
    }
}




/*

select dm.*, sender.name as sender_name, receiver.name as receiver_name from dm
JOIN users_t sender
ON dm.sender_id = sender.id
JOIN users_t receiver
ON dm.receiver_id = receiver.id;



select * from dm
join (
select GREATEST(sender_id, receiver_id) as user1, least(sender_id, receiver_id) as user2, MAX(created_at) as sent_at from dm where sender_id = 1 OR receiver_id = 1 group by greatest(sender_id, receiver_id), least(sender_id, receiver_id)
) as latest_dms
ON ((latest_dms.user1 = dm.sender_id AND latest_dms.user2 = dm.receiver_id) OR (latest_dms.user1 = dm.receiver_id AND latest_dms.user2 = dm.sender_id)) AND dm.created_at = latest_dms.sent_at
;



WITH latest_dms AS (
    SELECT
        GREATEST(sender_id, receiver_id) AS user1,
        LEAST(sender_id, receiver_id) AS user2,
        MAX(created_at) AS sent_at
    FROM dm
    WHERE sender_id = 1 OR receiver_id = 1
    GROUP BY GREATEST(sender_id, receiver_id), LEAST(sender_id, receiver_id)
)
SELECT
    dm.id,
    dm.message as lastMessage,
    u.id AS userId,
    u.username,
    CASE WHEN dm.sender_id = 1 THEN true ELSE false END AS isSender,
    CASE WHEN f.id IS NOT NULL THEN true ELSE false END AS isFavorite
FROM dm
JOIN latest_dms l
    ON l.sent_at = dm.created_at
    AND ((dm.sender_id = l.user1 AND dm.receiver_id = l.user2)
        OR (dm.receiver_id = l.user1 AND dm.sender_id = l.user2))
JOIN users_t u
    ON u.id != 1 AND (dm.sender_id = u.id OR dm.receiver_id = u.id)
LEFT JOIN favorites f
    ON f.user_id = 1
    AND f.fav_id = u.id;
*/