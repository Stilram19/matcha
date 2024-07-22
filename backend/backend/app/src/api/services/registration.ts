import pool from "../model/pgPoolConfig.js";

export async function checkIfUserAlreadyRegistered(email: string, username: string): Promise<string> {
    try {
        let field = '';
        const query = `SELECT username, email FROM "user" 
            WHERE username = $1 OR email = $2;`

        const client = await pool.connect();
        const result = await client.query(query, [username, email]);

        if (result.rows.length > 0) {
            field = result.rows[0].email === email ? 'email' : 'username';
        }

        client.release();

        return (field);
    }
    catch (err) {
        console.error(err);
        throw err;
    }
}

export async function saveUserSignUpCredentialsService(email: string, username: string, firstname: string, lastname: string, hashedPassword: string, passwordSalt: string) {
    // create a new record in user table
    try {
        let userId = undefined;
        const client = await pool.connect();
        const query = `
            INSERT INTO "user" (username, email, first_name, last_name, password, passwordSalt)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id;
        `;

        const results = await client.query(query, [
            username,
            email,
            firstname,
            lastname,
            hashedPassword,
            passwordSalt,
        ]);


        if (results.rows.length > 0) {
            userId = results.rows[0].id;
        }

        client.release();
        return (userId);
    }
    catch (err) {
        console.log(err);
        throw err;
    }
}

export async function saveEmailVerificationTokenService(verificationToken: string, userId: number): Promise<void> {
    try {
        const client = await pool.connect();
        const query = `
            INSERT INTO "email_verification" (user_id, token)
            VALUES ($1, $2);
        `;

        await client.query(query, [
            userId,
            verificationToken
        ]);

        client.release();
    }
    catch (err) {
        console.log(err);
        throw err;
    }
}

// Consumes the email verification token, verifies the user, and deletes the token
export async function userVerificationService(verificationToken: string): Promise<number | undefined> {
    try {
        let userId: number | undefined = undefined;

        const client = await pool.connect();

        // Start a transaction
        await client.query('BEGIN');

        try {
            // Query to find the user associated with the verification token
            const query = `SELECT id FROM "email_verification" 
                WHERE token = $1;`;
            const result = await client.query(query, [verificationToken]);

            if (result.rows.length > 0) {
                userId = result.rows[0].id;

                // Update the user record to set is_verified to true
                const updateUserQuery = `UPDATE "user" 
                    SET is_verified = TRUE 
                    WHERE id = $1;`;
                await client.query(updateUserQuery, [userId]);

                // Delete the verification record
                const deleteQuery = `DELETE FROM "email_verification" 
                    WHERE token = $1;`;
                await client.query(deleteQuery, [verificationToken]);

                await client.query('COMMIT');
            } else {
                await client.query('ROLLBACK');
            }
        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }

        return userId;
    } catch (err) {
        console.error(err);
        throw new Error('Database error');
    }
}
