import interestsList from "../helpers/interestsList.js";
import pool from "../model/pgPoolConfig.js";
import { BriefProfileInfos, ProfileInfos, UserInfos } from "../types/profile.js";

async function getUserInterests(userId: number): Promise<string[]> {
    let client;

    try {
        client = await pool.connect();
        const query = `SELECT interest FROM "user_interest" WHERE user_id = $1;`

        const result = await client.query(query, [userId]);

        if (result.rows.length === 0) {
            throw new Error(`failed retrieve profile interests`);
        }

        const interests = result.rows.map(row => row.interest);

        return (interests);
    }
    catch (err) {
        throw new Error('failed to retrieve brief profile interests');
    } finally {
        if (client) {
            client.release();
        }
    }
}

async function getUserPhotos(userId: number): Promise<string[]> {
    let client;

    try {
        client = await pool.connect();
        const query = `SELECT photo FROM "user_photo" WHERE user_id = $1;`

        const result = await client.query(query, [userId]);

        if (result.rows.length === 0) {
            throw new Error(`failed retrieve profile photos`);
        }

        const photosPaths = result.rows.map(row => process.env.BASE_URL + '/' + row.photo);

        return (photosPaths);
    }
    catch (err) {
        throw new Error('failed to retrieve profile photos');
    } finally {
        if (client) {
            client.release();
        }
    }
}

async function getUserInfos(userId: number, visitorUserId: number): Promise<UserInfos> {
    let client;

    try {
        client = await pool.connect();
        const query = `SELECT first_name, last_name, username, age, gender,
            sexual_preference, biography, profile_picture, fame_rating FROM "user" WHERE id = $1;`

        const result = await client.query(query, [userId]);

        if (result.rows.length === 0) {
            throw new Error(`couldn't retrieve user infos`);
        }

        const user = result.rows[0];

        let isSelf = userId === visitorUserId;
        let isLiked = false;
        let isLiking = false;

        if (!isSelf) {
            const firstLikeStateQuery = `SELECT id FROM "user_likes" 
                WHERE liking_user_id=$1 AND liked_user_id=$2`;
            const secondLikeStateQuery = `SELECT id FROM "user_likes" 
                WHERE liking_user_id=$2 AND liked_user_id=$1`;
            const parameters = [userId, visitorUserId];

            let isLikingResult = await client.query(firstLikeStateQuery, parameters);

            if (isLikingResult.rows.length > 0) {
                isLiking = true;
            }

            let isLikedResult = await client.query(secondLikeStateQuery, parameters);

            if (isLikedResult.rows.length > 0) {
                isLiked = true;
            }
        }

        const profilePicture = user.profile_picture ? process.env.BASE_URL as string + '/' + user.profile_picture : process.env.DEFAULT_PROFILE_PICTURE as string;

        return ({
            id: String(userId),
            firstName: user.first_name,
            lastName: user.last_name,
            userName: user.username,
            age: user.age ?? 18,
            gender: user.gender ?? '',
            sexualPreferences: user.sexual_preference ?? '',
            biography: user.biography ?? `Hey there, I am using matcha. Looking for someone to share sunsets and spontaneous road trips. let’s make memories together.`,
            profilePicture,
            fameRating: user.fame_rating,
            isSelf,
            isLiked,
            isLiking
        });
    }
    catch (err) {
        throw new Error('failed to retrieve brief profile infos');
    } finally {
        if (client) {
            client.release();
        }
    }
}

export async function getProfileInfosService(userId: number, visitorUserId: number): Promise<ProfileInfos | undefined> {
    if (userId < 1 || userId > 3) {
        return (undefined);
    }

    const userInfos = await getUserInfos(userId, visitorUserId);
    console.log('helooooo');
    const interests = await getUserInterests(userId);
    const userPhotos = await getUserPhotos(userId);

    return ({userInfos, interests, userPhotos});
}

export async function getBriefProfileInfosService(userId: number): Promise<BriefProfileInfos | undefined> {
    let client;

    try {
        client = await pool.connect();
        const query = `SELECT first_name, last_name, username, age, gender,
            sexual_preference, biography, profile_picture FROM "user" WHERE id = $1;`

        const result = await client.query(query, [userId]);

        if (result.rows.length === 0) {
            return (undefined);
        }

        const user = result.rows[0];

        return ({
            id: String(userId),
            firstName: user.first_name,
            lastName: user.last_name,
            userName: user.username,
            age: user.age ?? 18,
            gender: user.gender ?? '',
            sexualPreferences: user.sexual_preference ?? '',
            biography: user.biography ?? `Hey there, I am using matcha. Looking for someone to share sunsets and spontaneous road trips. let’s make memories together.`,
            profilePicture: user.profile_picture ?? process.env.DEFAULT_PROFILE_PICTURE
        })
    }
    catch (err) {
        throw new Error('failed to retrieve brief profile infos');
    } finally {
        if (client) {
            client.release();
        }
    }
}

export async function updateUserInterestsService(userId: number, newInterests: string[]): Promise<void> {
    const client = await pool.connect();

    try {
        await client.query('BEGIN'); 

        const filteredInterests = newInterests.filter(interest => interestsList.has(interest));

        if (filteredInterests.length === 0) {
            throw new Error('no valid interest');
        }

        const deleteQuery = 'DELETE FROM user_interest WHERE user_id = $1';
        await client.query(deleteQuery, [userId]);

        const insertQuery = `
            INSERT INTO user_interest (user_id, interest)
            VALUES ${filteredInterests.map((_, index) => `($1, $${index + 2})`).join(', ')}
        `;

        const values = [userId, ...filteredInterests];
        await client.query(insertQuery, values);

        await client.query('COMMIT');
    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Error updating user interests:', err);
        throw new Error('Failed to update user interests');
    } finally {
        client.release();
    }
}

export async function addUserInterestsService(userId: number, interests: string[]) {
    let client;

    try {
        const filteredInterests = interests.filter(interest => interestsList.has(interest));

        if (filteredInterests.length === 0) {
            throw new Error('no valid interest');
        }

        const placeholders = filteredInterests.map((_, index) => `($1, $${index + 2})`).join(', ');

        const query = `
            INSERT INTO user_interest (user_id, interest)
            VALUES ${placeholders}
            ON CONFLICT (user_id, interest) DO NOTHING;
        `;

        client = await pool.connect();

        await client.query('BEGIN');
        await client.query(query, [userId, ...filteredInterests]);
        await client.query('COMMIT');
    }
    catch (err) {
        if (client) {
            await client.query('ROLLBACK');
        }
        throw err;
    } finally {
        if (client) {
            client.release();
        }
    }
}

async function removeUserConnection(blockingUserId: number, blockedUserId: number) {
    await unlikeProfileService(blockingUserId, blockedUserId);
    await unlikeProfileService(blockedUserId, blockingUserId);
}

async function addBlockedUser(blockingUserId: number, blockedUserId: number) {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const checkBlockQuery = `
            SELECT id 
            FROM blocked_users 
            WHERE blocking_user_id = $1 AND blocked_user_id = $2
        `;
        const checkBlockResult = await client.query(checkBlockQuery, [blockingUserId, blockedUserId]);

        if (checkBlockResult.rows.length > 0) {
            console.log('User is already blocked');
            await client.query('COMMIT');
            return;
        }

        const insertBlockQuery = `
            INSERT INTO blocked_users (blocking_user_id, blocked_user_id)
            VALUES ($1, $2)
        `;
        await client.query(insertBlockQuery, [blockingUserId, blockedUserId]);

        await client.query('COMMIT');
    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Error blocking user:', err);
        throw new Error('Failed to block user');
    } finally {
        client.release();
    }
}

export async function blockUserService(blockingUserId: number, blockedUserId: number) {
    await removeUserConnection(blockingUserId, blockedUserId);
    await addBlockedUser(blockingUserId, blockedUserId);
}

export async function reportFakeAccountService(reportedUserId: number) {

}

export async function likeProfileService(likingUserId: number, likedUserId: number) {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const checkLikeQuery = `
            SELECT id 
            FROM user_likes 
            WHERE liking_user_id = $1 AND liked_user_id = $2
        `;
        const checkLikeResult = await client.query(checkLikeQuery, [likingUserId, likedUserId]);

        if (checkLikeResult.rows.length > 0) {
            console.log('Liking user has already liked the user');
            await client.query('COMMIT');
            return;
        }

        const insertLikeQuery = `
            INSERT INTO user_likes (liking_user_id, liked_user_id)
            VALUES ($1, $2)
        `;
        await client.query(insertLikeQuery, [likingUserId, likedUserId]);

        await client.query('COMMIT');
    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Error liking user:', err);
        throw new Error('Failed to like user');
    } finally {
        client.release();
    }
}

export async function unlikeProfileService(likingUserId: number, likedUserId: number) {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const checkLikeQuery = `
            SELECT id 
            FROM user_likes 
            WHERE liking_user_id = $1 AND liked_user_id = $2
        `;
        const checkLikeResult = await client.query(checkLikeQuery, [likingUserId, likedUserId]);

        if (checkLikeResult.rows.length === 0) {
            console.log('Like record does not exist');
            await client.query('COMMIT');
            return;
        }

        const deleteLikeQuery = `
            DELETE FROM user_likes 
            WHERE liking_user_id = $1 AND liked_user_id = $2
        `;
        await client.query(deleteLikeQuery, [likingUserId, likedUserId]);

        await client.query('COMMIT');
    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Error unliking user:', err);
        throw new Error('Failed to unlike user');
    } finally {
        client.release();
    }
}

export async function isBlockedService(blockingUserId: number, blockedUserId: number) {
    const client = await pool.connect();

    try {
        const query = `
            SELECT id 
            FROM blocked_users 
            WHERE blocking_user_id = $1 AND blocked_user_id = $2
        `;
        const result = await client.query(query, [blockingUserId, blockedUserId]);

        return result.rows.length > 0;
    } catch (err) {
        console.error('Error checking block status:', err);
        throw new Error('Failed to check block status');
    } finally {
        client.release();
    }
}
