import HttpError from "../helpers/HttpError.js";
import pool from "../model/pgPoolConfig.js"
import { isUserOnline } from "./socket.service.js";



export async function getVisitsHistoryService(userId: number, page: number, pageSize: number) {
    const   query = `
        WITH  visitors AS (
            SELECT
                visitor_id,
                visited_at
            FROM history
            LEFT JOIN blocked_users b
                ON (blocked_user_id, blocking_user_id) = (visitor_id, visited_id)
                    OR (blocking_user_id, blocked_user_id) = (visitor_id, visited_id)
            WHERE visited_id = $1 AND b.blocking_user_id IS NULL
        )

        SELECT
            id,
            username,
            first_name,
            last_name,
            profile_picture,
            biography,
            gender,
            age,
            sexual_preference,
            visited_at
        FROM visitors v
        JOIN "user" u
            ON u.id = v.visitor_id
        ORDER BY visited_at DESC
        LIMIT $2
        OFFSET $3
    `

    const client = await pool.connect();

    try {
        const   history = await client.query(query, [userId, pageSize, page * pageSize]);
        return (history.rows.map((visitor) => ({
            id: visitor.id,
            userName: visitor.username,
            firstName: visitor.first_name,
            lastName: visitor.last_name,
            profilePicture: visitor.profile_picture ? process.env.BASE_URL as string + '/' + visitor.profile_picture : process.env.DEFAULT_PROFILE_PICTURE as string,
            biography: visitor.biography,
            gender: visitor.gender,
            age: visitor.age,
            sexualPreferences: visitor.sexual_preference,
            status: isUserOnline(visitor.id) ? 'online' : 'offline',
            visitedAt: visitor.visited_at
        })))
    } catch (e) {
        throw e;
    } finally {
        client.release();
    }


}


export async function visitProfileService(visitorId: number, visitedId: number): Promise<boolean> {

    const query = `
            INSERT INTO "history"
                (visitor_id, visited_id)
            VALUES
                ($1, $2)
        `
    if (visitedId === visitorId)
        return false;

    const client = await pool.connect();
    try {
        const validateQuery = `SELECT id FROM "user" WHERE id = $1`;
        const visited = await client.query(validateQuery, [visitedId]);
        if (visited.rowCount === 0) {
            throw new HttpError(400, 'Invalid visitor or visited id');
        }

        const checkQuery = `
            SELECT EXISTS (
                SELECT 1
                FROM "history"
                WHERE visitor_id = $1 AND visited_id = $2
                    AND visited_at > NOW() - INTERVAL '1 hour'
                ) AS exists;
        `
        const duplicateVisit = await client.query(checkQuery, [visitorId, visitedId]);
        if (duplicateVisit.rows[0].exists === true) {
            return false;
        }

        await client.query(query, [visitorId, visitedId]);
        return (true);
    } catch (e) {
        throw (e);
    } finally {
        client.release();
    }

}