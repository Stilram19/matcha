import HttpError from "../helpers/HttpError.js";

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
    const dms: any[] = [];
    dms.sort((a, b) => a.created_at - b.created_at)
    // filter out the blocked one by the userId

    return [];
}


export async function getChatHistory(userId: number, participantId: number) {
    if (!await checkIdExists(participantId)) {
        throw new HttpError(404, 'User Id not found');
    }

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
    return {
        id: 1,
        username: 'okhiar',
        first_name: 'oussama',
        last_name: 'khiar',
        profile_picture: '/imgs/okhiar.jpg',
        status: 'online',
        biography: 'Blah blah'
    }
}

export async function getFavoriteUsers(userId: number) {
    // select * from favorites WHERE user_id = userId JOIN with users on favorite_user_id = users.id

    return [];
}