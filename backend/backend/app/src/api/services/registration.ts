import { users } from "../helpers/constant.js";

export async function isNewEmail(email: string): Promise<boolean> {
    // search in the database for 'email'
    // if a match found, return false, otherwise return true

    return (true);
}

export async function isNewUsername(username: string): Promise<boolean> {
    // search in datbase for input username
    // if a match found, return false, otherwise return true

    return (true);
}

export async function saveUser(email: string, username: string, hashedPassword: string, passwordSalt: string): Promise<void> {
    // create a new record in user table
    users.push({email, username, hashedPassword, passwordSalt});
}

export async function saveEmailVerificationToken(verificationToken: string): Promise<void> {
    // create a new record in email-verification-token table
}