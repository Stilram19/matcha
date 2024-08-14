import { QueryResult } from "pg";
import pool from "../model/pgPoolConfig.js";
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

    let results: QueryResult; 
    try {
        results = await client.query(retrieveQuery, [userId]);
    } catch (e) {
        console.log(e);
        throw (e);
    } finally {
        client.release();
    }

    return  results.rows.map(contact => ({
        id: contact.id,
        firstName: contact.first_name,
        lastName: contact.last_name,
        username: contact.username,
        profilePicture: `${process.env.BASE_URL}/${contact.profile_picture}`,
        status: isUserOnline(contact.id) ? 'online' : 'offline',
    }));
}


export async function retrieveDms(userId: number) {
    const   query = `
        WITH latest_messages as (
            SELECT
                GREATEST(sender_id, receiver_id) as user1,
                LEAST(sender_id, receiver_id) as user2,
                MAX(sent_at) as sent_at,
                SUM(
                    CASE
                        WHEN receiver_id = $1 AND status = 'unread'
                        THEN 1
                        ELSE 0
                    END
                ) as unread_count
            FROM "dm"
            WHERE sender_id = $1 OR receiver_id = $1
            GROUP BY user1, user2
        )
        SELECT
            d.sender_id,
            d.receiver_id,
            d.content,
            d.content_type,
            l.unread_count,
            u.id,
            u.username,
            u.first_name,
            u.last_name,
            u.profile_picture,
            CASE
                WHEN d.sender_id = $1
                THEN true
                ELSE false
            END AS is_sender,
            CASE
                WHEN ufc.id IS NULL
                THEN false
                ELSE true
            END AS is_favorite
        FROM "dm" d
        JOIN latest_messages l
            ON d.sent_at = l.sent_at
                AND ((d.receiver_id = l.user1 AND d.sender_id = l.user2)
                    OR (d.receiver_id = l.user2 AND d.sender_id = l.user1))
        JOIN "user" u
            ON u.id != $1
                AND (u.id IN (sender_id, receiver_id))
        LEFT JOIN "user_favorite_contacts" ufc
            ON ufc.user_id = $1
                AND ufc.favorite_user_id = u.id
        ORDER BY d.sent_at DESC
    `
    const client = await pool.connect();


    try {
        console.log('get dfms')
        const results = await client.query(query, [userId]);
        console.log(results.rows);

        // ! Adding is it online
        return (results.rows.map((dm) => ({
            id: dm.id,
            username: dm.username,
            firstName: dm.first_name,
            lastName: dm.last_name,
            messageType: dm.content_type,
            lastMessage: dm.content,
            unreadCount: Number(dm.unread_count),
            status: isUserOnline(dm.id) ? 'online' : 'offline',
            profilePicture: process.env.BASE_URL + '/' + dm.profile_picture,
            isSender: dm.is_sender,
            isFavorite: dm.is_favorite,
        })));
    } catch (e) {
        console.log(e)
        throw e;
    } finally {
        client.release();
    }

}



// ? add pagination functionality for this service
export async function getChatHistory(userId: number, participantId: number, page: number, pageSize: number) {
    // if (await isBlockedService(participantId, userId))
    //     throw new HttpError(403, 'Forbidden');

// get Conversation history with the participant id, and set the unread messages to read 
    const   client = await pool.connect();

    // ! add dms offset in the api call
    const   query = `
            SELECT
                id,
                content_type,
                content,
                sent_at,
                CASE
                    WHEN sender_id = $1 THEN true
                    ELSE false
                END AS is_sender
            FROM "dm"
            WHERE
                (receiver_id, sender_id) IN (($1, $2), ($2, $1))
            ORDER BY sent_at DESC
            LIMIT $3
            OFFSET $4
        `

    const offset = (page * pageSize);
    const limit = pageSize;

    try {
        const results = await client.query(query, [userId, participantId, limit, offset]);
        
        // console.log(results.rows);
        return (results.rows.map((chat) => ({
                id: chat.id,
                isSender: chat.is_sender,
                messageType: chat.content_type,
                messageContent: chat.content_type === 'text' ? chat.content : process.env.BASE_URL + '/' + chat.content,
                sentAt: chat.sent_at,
            })
        ));
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
                biography
            FROM "user"
            WHERE id = $1;
        `

    // find the user #participant
    // mark all messages as read
    const client = await pool.connect();

    try {
        const results = await client.query(query, [participant]);

        const contactDetails = results.rows[0];
        return {
            id: contactDetails.id,
            username: contactDetails.username,
            firstName: contactDetails.first_name,
            lastName: contactDetails.last_name,
            profilePicture: process.env.BASE_URL + '/' + contactDetails.profile_picture,
            biography: contactDetails.biography,
            status: (isUserOnline(contactDetails.id) ? 'online' : 'offline')
        }
    } catch (e) {
        throw e;
    } finally {
        client.release();
    }
}


// Not completed yet
export async function getParticipantInfoById(userId: number, participantId: number) {
    const query = `
        SELECT
            u.id,
            username,
            first_name,
            last_name,
            profile_picture,
            CASE
                WHEN ufc.id IS NULL THEN false
                ELSE true
            END AS is_favorite
        FROM "user" u
        LEFT JOIN "user_favorite_contacts" ufc
            ON ufc.user_id = $1 AND ufc.favorite_user_id = u.id
        WHERE u.id = $2;
    `

    /*
        SELECT
            u.id,
            username,
            first_name,
            last_name,
            profile_picture,
            EXISTS (
                SELECT 1
                FROM "user_favorite_contacts"
                WHERE user_id = $1 AND favorite_user_id = $2
            ) AS is_favorite
        FROM "user" u
        WHERE u.id = $2;
    */

    const client = await pool.connect();
    try {
        const results = await client.query(query, [userId, participantId]);
        const participantUser = results.rows[0];
        return ({
            id: participantUser.id,
            username: participantUser.username,
            firstName: participantUser.first_name,
            lastName: participantUser.last_name,
            profilePicture: process.env.BASE_URL + '/' + participantUser.profile_picture,
            isFavorite: participantUser.is_favorite,
            status: isUserOnline(participantId) ? 'online' : 'offline',
        })
    } catch (e) {
        throw (e);
    } finally {
        client.release();
    }
}

// export async function getFavoriteUsers(userId: number) {
//     // select * from favorites WHERE user_id = userId JOIN with users on favorite_user_id = users.id

//     return dummyDms.filter((value) => value.isFavorite);
// }


export  async function markMessagesAsReadService(userId: number, participantId: number) {
    const   query = `
        UPDATE "dm"
        SET status = 'read'
        WHERE receiver_id = $1 AND sender_id = $2 
    `
    const client = await pool.connect();

    try {
        await client.query(query, [userId, participantId]);
    } catch (e) {
        console.error('querying error');
        throw (e);
    } finally {
        client.release();
    }
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
    const query = `UPDATE dm SET status = 'read' WHERE id = $1` // 1 means the message was read

    try {
        const res = await client.query(query, [messageId]);
        console.log('message maked as read');
    } catch (e) {
        throw (e);
    } finally {
        client.release();
    }
}


export async function createNewDm(senderId: number, receiverId: number, messageType: string, messageContent: any) {
    const   dmCreatationQuery = `INSERT INTO "dm"
                                (sender_id, receiver_id, content_type, content) values ($1, $2, $3, $4)
                                RETURNING id, sent_at, content_type, content;`

    const dbClient = await pool.connect();

    try {
        const results = await dbClient.query(dmCreatationQuery, [senderId, receiverId, messageType, messageContent]); // ? status get default ('unread') 
        const insertedRow = results.rows[0];

        return ({
            id: insertedRow.id,
            messageType: insertedRow.content_type,
            messageContent: insertedRow.content,
            sentAt: insertedRow.sent_at,
        });
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