import pool from "../model/pgPoolConfig.js";

export async function findOrCreateUser(profile: any): Promise<number> {
    let client;

    // for (let field in profile) {
    //     console.log(`Discord_${field}: ${profile[field]}`);
    // }

    try {
        client = await pool.connect();
        const query = `
            SELECT id, username, discord_id FROM "user"
            WHERE username = $1 OR email = $2
        `;

        const result = await client.query(query, [profile.username, profile.email]);

        let username = profile.username;

        if (result.rows.length > 0) {
            const user = result.rows[0];

            if (user.discord_id === profile.id) {
                return (user.id);
            }

            // modify username if there is only a username conflict
            if (user.username === profile.username) {
                username = `DISCORD__${username}`;
            }
        }

        const insertQuery = `
            INSERT INTO "user" (discord_id, username, email, first_name, last_name, password, password_salt, is_verified)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING id;
        `;

        const insertResult = await client.query(insertQuery, [profile.id, username, profile.email, 'first_name', 'last_name', '', '', true]);
        return (insertResult.rows[0].id);

    } catch (err) {
        console.log(err);
        throw new Error('findOrCreateUser failed!');
    } finally {
        if (client) {
            client.release();
        }
    }
}

export async function isProfileComplete(userId: number): Promise<boolean> {
    let client;

    try {
        client = await pool.connect();

        const query = `
            SELECT id FROM "user"
            WHERE id = $1 AND is_profile_complete = true
        `;

        const result = await client.query(query, [userId]);

        return (result.rows.length > 0); 
    } catch (err) {
        console.error('Error checking profile completeness:', err);
        throw new Error('profileCompleteCheck failed!');
    } finally {
        if (client) {
            client.release();
        }
    }
}
