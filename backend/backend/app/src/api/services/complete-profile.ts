import dotenv from 'dotenv'
import { updateProfilePersonalInfos } from '../types/profile.js';
import pool from '../model/pgPoolConfig.js';

dotenv.config();

export async function addUserPhotosService(userId: number, photosPaths: string[]) {
    photosPaths.forEach( path => console.log(process.env.BASE_URL + `/${path}`) );
}

export async function updatePersonalInfosService(profileInfos: updateProfilePersonalInfos) {
    console.log('username: ' + profileInfos.username);
    console.log('firstname: ' + profileInfos.firstname);
    console.log('lastname: ' + profileInfos.lastname);
    console.log('gender: ' + profileInfos.gender);
    console.log('sexualPreferences: ' + profileInfos.sexualPreference);
    console.log('biography: ' + profileInfos.biography);
    console.log('age: ' + profileInfos.age);

    if (profileInfos.profilePicturePath) {
        console.log('profilePictureUrl: ' + process.env.BASE_URL + `/${profileInfos.profilePicturePath}`);
        return (process.env.BASE_URL + `/${profileInfos.profilePicturePath}`);
    } else {
        console.log('profilePictureUrl: null');
        return (null);
    }
    // don't forget to check if the username is already there!
}

export async function setProfileAsCompleteService(userId: number) {
    let client;

    try {
        client = await pool.connect();
        const query = `UPDATE "user" 
                    SET is_profile_complete = TRUE 
                    WHERE id = $1;`;

        await client.query(query, [userId]);

    }
    catch (err) {
        throw err;
    } finally {
        if (client) {
            client.release();
        }
    }
}
