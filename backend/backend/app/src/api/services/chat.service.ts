import { dummyDms } from "../helpers/dummyDms.js";
import HttpError from "../helpers/HttpError.js";
import { execute } from "../model/execute.js";
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

    const results = await client.query(retrieveQuery, [userId]);
    console.log(results.rows);
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
    // retrieving the last dms list
    // const dms = await getDMSList(userId);
    // const dms: any[] = [];
    // dms.sort((a, b) => a.created_at - b.created_at)
    // filter out the blocked one by the userId
    // Checking if they liked each other

    // const   query = `
    //     (SELECT MAX(sent_at) FROM dm WHERE sender_id = $1 OR reciever_id = $1 GROUP BY sender_id, reciever_id) as latest_messages
    //     INNER JOIN dms ON dms.
    // `

    // const   dms = await execute('SELECT * FROM dm WHERE sender_id = $1 OR receiver_id = $2', [userId])


    return dummyDms;
}


export async function getChatHistory(userId: number, participantId: number) {
    // ! this should be in its own middleware, (maybe checking it when checking the is it blocked)
    // if (!await checkIdExists(participantId)) {
    //     throw new HttpError(404, 'User Id not found');
    // }


    // get Conversation history with the participant id, and set the unread messages to read

    const   client = 



    const records: any[] = [];
    const chat_history = records.map((record) => {
        return {
            message_txt: "Blah blah blah. mm blah blah",
            isSender: false || true,
            created_at: Date.now(),
        }
    })

    return {
        id: 1,
        username: 'okhiar',
        first_name: 'oussama',
        last_name: 'khiar',
        status: 'online',
        isFavorite: false || true,
        messages: chat_history,
    };
}


export async function getContactDetails(participant: number) {
    if (!await checkRecordExistence('user', participant)) {
        throw new HttpError(404, 'User Id not found');
    }

    // find the user #participant
    // mark all messages as read
    return {
        id: 1,
        username: 'okhiar',
        firstName: 'oussama',
        lastName: 'khiar',
        profilePicture: '/imgs/man_placeholder.jpg',
        status: 'online',
        biography: 'Sed tempor purus eu nibh tempor iaculis. Aenean accumsan, orci at maximus euismod, est nisi blandit nibh, 😆'
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