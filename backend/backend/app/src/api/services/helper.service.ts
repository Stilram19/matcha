import { fileTypeFromBuffer } from "file-type";
import pool from "../model/pgPoolConfig.js";
import { IUserBrief } from "../types/chat.type.js";
import { isUserOnline } from "./socket.service.js";
import { ApplicationError } from "../helpers/ApplicationError.js";
import { writeFile } from "fs";
import path from "path";
import { ACTOR_NAME_PLACEHOLDER } from "../types/enums.js";


async function    validateUploadedFile(view: Uint8Array) {
    const   type = await fileTypeFromBuffer(view)
    console.log(type)
    return (type && type.mime === 'video/webm');
}

export function generateAudioFileName(userId: number) {
    let fileName: string;

    fileName = `audio-${Date.now()}_${userId}.wav`
    return (fileName);
}

export async function saveAudioFile(audioData: ArrayBuffer, filename: string) {
    const view = new Uint8Array(audioData);

    if (!await validateUploadedFile(view))
        throw new ApplicationError('Invalid audio file type. Please upload a WAV file.');

    let audioFileName = `uploads/${filename}`;

    writeFile(path.join(path.resolve(), 'uploads', filename), view, (err) => {
        if (err) {
            console.log('write error:');
            console.log(err);
        }
    });
    return (audioFileName);
}

export async function getUserBrief(userId: number): Promise<IUserBrief> {
    const client = await pool.connect();

    const query = `SELECT id, first_name, last_name, username, profile_picture FROM "user" WHERE id = $1;`
    
    let results;
    try {
        results = await client.query(query, [userId]);
    } catch (e) {
        throw e;
    } finally {
        client.release();
    }

    if (results.rowCount === 0)
        throw new ApplicationError('user not found');

    const user = results.rows[0];
    return {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        profilePicture: user.profile_picture ? process.env.BASE_URL as string + '/' + user.profile_picture : process.env.DEFAULT_PROFILE_PICTURE as string, // put this in it own function
        status: (isUserOnline(userId) ? 'online' : 'offline') as 'online' | 'offline',
    };
}




// ? helper function
export function substituteActorInNotificationDesc(description: string, fullname: string) : string {
    return (description.replace(ACTOR_NAME_PLACEHOLDER, fullname));
}