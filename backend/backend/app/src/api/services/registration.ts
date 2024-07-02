import { users, verificationTokens } from "../helpers/constant.js";

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

export async function saveUserSignUpCredentials(email: string, hashedPassword: string, passwordSalt: string): Promise<void> {
    // create a new record in user table
    users.push({email, hashedPassword, passwordSalt});
}

export async function saveEmailVerificationToken(verificationToken: string): Promise<void> {
    // create a new record in email-verification-token table
    verificationTokens.currentMaxId++;
    verificationTokens.tokens.push( {userId: verificationTokens.currentMaxId, token: verificationToken} );
}

// returns the correspondent userId or undefined if not found
export async function consumeEmailVerificationToken(verificationToken: string): Promise<number | undefined> {
    const recordIndex = verificationTokens.tokens.findIndex(token => token.token === verificationToken);

    if (recordIndex === -1) {
        return (undefined);
    }

    // add logic for token expiration

    const userId = verificationTokens.tokens[recordIndex].userId;

    // delete record
    verificationTokens.tokens.splice(recordIndex);

    return (userId);
}
