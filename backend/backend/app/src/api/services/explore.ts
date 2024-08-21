import { dummyProfileInfos } from "../helpers/constant.js";
import pool from "../model/pgPoolConfig.js";
import { Filters } from "../types/explore.js";
import { BriefUserInfos } from "../types/profile.js";
import { getMatchingSexualOrientation, getOppositeGenders } from "../utils/explore.js";
import dotenv from 'dotenv'
import { getUserInterests } from "./profile.js";

dotenv.config();

export async function getRecommendedProfilesService(userId: number, filters: Filters) {
    const userInterests = await getUserInterests(userId);
    return (dummyProfileInfos);
}

export async function filterProfilesByPersonalInfos(
    userId: number,
    fameRatingRange: [number, number],
    ageRange: [number, number]
): Promise<BriefUserInfos[]> {
    let client;

    try {
        client = await pool.connect();
        
        const query1 = `SELECT gender, sexual_preference FROM "user" WHERE id = $1`;
        const result1 = await client.query(query1, [userId]);

        if (result1.rows.length === 0) {
            throw new Error('No user found with the provided userId');
        }

        const userPreferences = result1.rows[0];
        const sexualPreferences = getMatchingSexualOrientation(userPreferences.gender, userPreferences.sexual_preference);
        const oppositeGenders = getOppositeGenders(userPreferences.gender);

        const query2 = `
            SELECT id, first_name, last_name, username, age, gender,
            sexual_preference, biography, profile_picture, fame_rating FROM "user" 
            WHERE id != $1 
            AND (
                (sexual_preference = ANY($2::text[]) AND sexual_preference != 'heterosexual')
                OR 
                (sexual_preference = 'heterosexual' AND gender = ANY($3::text[]))
            )
            AND fame_rating BETWEEN $4 AND $5
            AND age BETWEEN $6 AND $7
            LIMIT 30;
        `;

        const result2 = await client.query(query2, [
            userId,
            sexualPreferences,
            oppositeGenders,
            fameRatingRange[0],
            fameRatingRange[1],
            ageRange[0],
            ageRange[1],
        ]);
 
        return result2.rows.map(user => {
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
            });
        });
    } catch (err) {
        console.error('Error filtering profiles:', err);
        throw new Error('Failed to filter profiles');
    } finally {
        if (client) {
            client.release();
        }
    }
}

export async function filterProfilesByInterests(userId: number, filteredUserIds: number[], userInterests: string[], interestThreshold: number): Promise<number[]> {
    let client;

    try {
        client = await pool.connect();

        const filteredUserInterestsQuery = `
            SELECT user_id, interest FROM user_interest
            WHERE user_id = ANY($1::int[])
        `;
        const filteredUserInterestsResult = await client.query(filteredUserInterestsQuery, [filteredUserIds]);

        const userInterestsMap: Record<number, Set<string>> = {};
        filteredUserInterestsResult.rows.forEach(row => {
            const user = row.user_id;
            const interest = row.interest;

            if (!userInterestsMap[user]) {
                userInterestsMap[user] = new Set();
            }

            userInterestsMap[user].add(interest);
        });

        const matchedUserIds = Object.keys(userInterestsMap).filter(userId => {
            const interests = userInterestsMap[Number(userId)];
            const matchCount = [...interests].filter(interest => userInterests.includes(interest)).length;
            return matchCount >= interestThreshold;
        }).map(Number);

        return matchedUserIds;
    } catch (err) {
        console.error('Error filtering profiles by interests:', err);
        throw new Error('Failed to filter profiles by interests');
    } finally {
        if (client) {
            client.release();
        }
    }
}

export async function filterAlreadyLikedProfiles(userId: number, filteredUserIds: number[]): Promise<number[]> {
    let client;

    try {
        client = await pool.connect();
        const query = `SELECT id FROM "user_likes" 
                WHERE liking_user_id=$1 AND liked_user_id=ANY($2::text[])`;
 
        const result = await client.query(query, [userId, filteredUserIds]);

        if (result.rows.length === 0) {
            throw new Error('Failed to filter profiles');
        }

        const resultSet = new Set(result.rows);

        const ret = filteredUserIds.filter(id => !resultSet.has(id));

        return (ret);
    } catch (err) {
        console.error('Error filtering profiles:', err);
        throw new Error('Failed to filter profiles');
    } finally {
        if (client) {
            client.release();
        }
    }
}
