import { users } from "../helpers/constant.js";
import { compareDataWithSalt, hashDataWithSalt } from "./hashing.js";

export async function isLoginValid(username: string, password: string): Promise<boolean> {
    const user = users.find( user => user.username === username);

    if (user === undefined) {
        return (false);
    }

    return (await compareDataWithSalt(password, user.hashedPassword, user.passwordSalt));
}

export async function isEmailValid(email: string): Promise<boolean> {
    // query the database for the input email

    const user = users.find( user => user.email === email );

    return (user != undefined);
}

export async function saveResetPasswordToken(email: string, resetToken: string): Promise<void> {
    // save the resetToken in the user record matching the input email
    const userIndex = users.findIndex( user => user.email === email );

    if (userIndex == -1) {
        console.log('unexpected error');
        return ;
    }

    users[userIndex].resetToken = resetToken;
}

export async function changePassword(resetToken: string, password: string): Promise<number | undefined> {
    // check if there is a user row with such a resetToken

    const user = users.find( user => user.resetToken === resetToken );

    if (user == undefined) {
        return (undefined);
    }

    // hash password with salt and save user credentials
    const [hashedPassword, salt] = await hashDataWithSalt(password);

    user.hashedPassword = hashedPassword;
    user.passwordSalt = salt;

    return (1);
}
