import { dummyDms } from "../helpers/dummyDms.js";
import HttpError from "../helpers/HttpError.js";
import { execute } from "../model/execute.js";

// type DmListType = {
//     id: number,
//     username: string,
//     first_name: string,
//     last_name: string,
//     last_message: string,
//     status: 'online' | 'offline',
//     msg_created_at: Date,
// }


export async function checkIdExists(id: number) {
    // check the id is it exists in the users table
    return (true);
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
    if (!await checkIdExists(participant)) {
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