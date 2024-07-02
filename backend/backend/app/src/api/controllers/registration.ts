import { Request, Response } from 'express'
import { consumeEmailVerificationToken, isNewEmail, isNewUsername, saveEmailVerificationToken, saveUserSignUpCredentials } from '../services/registration.js';
import { generateRandomToken, hashDataWithSalt } from '../services/hashing.js';
import { sendEmailVerification } from '../services/mailService.js';

export async function localStrategy(request: Request, response: Response): Promise<void> {
    try {
        const email = request.body.email as string;
        const password = request.body.password as string;

        // checking that the email is not already in use
        if (await isNewEmail(email) == false) {
            response.status(400).send( { msg: 'Please use a different email address.' } );
            return ;
        }

        // hash password with salt and save user credentials
        const [hashedPassword, salt] = await hashDataWithSalt(password);

        saveUserSignUpCredentials(email, hashedPassword, salt);

        const verificationToken = generateRandomToken(16);

        // wait until the token is stored
        await saveEmailVerificationToken(verificationToken);

        // send email verification without blocking the user
        sendEmailVerification(email, verificationToken).catch(err => {
            console.log('error sending the verification email!');
        });

        response.status(201).send( { msg: 'Registration successful. Please check your email to verify your account.' } );
    }
    catch (err) {
        response.status(500).send( { msg: err } );
    }
}

export async function emailVerficiation(request: Request, response: Response): Promise<void> {
    try {
        // the token is already checked in the previous middleware
        const authHeader = request.headers['authorization'] as string;
        const token = authHeader.split(' ')[1] as string;

        // verifying the token, if it exists it will be deleted (consumed)
        const userId = await consumeEmailVerificationToken(token);

        console.log();

        if (!userId) {
            response.status(403).send( { msg: 'token not found or expired!' } );
            return ;
        }

        // const accessToken = generateAccessToken();
        // const refreshToken = generateRefreshToken();

        // validateUserRegistration(userId, refreshToken);

        response.sendStatus(201);
    }
    catch (err) {
        response.status(500).send( { msg: err } );        
    }
}
