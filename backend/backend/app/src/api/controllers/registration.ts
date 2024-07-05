import { Request, Response } from 'express'
import { consumeEmailVerificationToken, isNewEmail, isNewUsername, saveEmailVerificationToken, saveUserSignUpCredentials } from '../services/registration.js';
import { generateRandomToken, hashDataWithSalt } from '../services/hashing.js';
import { sendEmailVerification } from '../services/mailService.js';
import { formError } from '../helpers/errorFactory.js';
import { generateAccessToken, generateRefreshToken } from '../services/jwt.js';
import { setCSRFcookies, setJwtTokensAsHttpOnlyCookies } from '../utils/cookies.js';

export async function localStrategy(request: Request, response: Response): Promise<void> {
    try {
        const email = request.body.email as string;
        const username = request.body.username as string;
        const firstname = request.body.firstname as string;
        const lastname = request.body.lastname as string;
        const password = request.body.password as string;

        console.log('cookies: ' + request.cookies['AccessToken']);

        // checking that the email is not already in use
        if (await isNewEmail(email) == false) {
            response.status(400).send( formError('email', 'Please use a different email address') );
            return ;
        }

        // checking that the username is not already in use
        if (await isNewUsername(username) == false) {
            response.status(400).send( formError('username', 'Please use a different username') );
            return ;
        }

        // hash password with salt and save user credentials
        const [hashedPassword, salt] = await hashDataWithSalt(password);

        saveUserSignUpCredentials(email, username, firstname, lastname, hashedPassword, salt);

        const verificationToken = generateRandomToken(16);

        // wait until the token is stored
        await saveEmailVerificationToken(verificationToken);

        console.log(`firstname: ${firstname}`);

        // send email verification without blocking the user
        sendEmailVerification(email, firstname, verificationToken).catch(err => {
            console.log('error sending the verification email!');
        });

        response.status(201).send( { msg: 'Registration successful. Please check your email to verify your account.' } );
    }
    catch (err) {
        // response.sendStatus(500);
    }
}

export async function emailVerficiation(request: Request, response: Response): Promise<void> {
    try {
        // the token is already checked in the previous middleware
        const authHeader = request.headers['authorization'] as string;
        const token = authHeader.split(' ')[1] as string;

        // verifying the token, if it exists it will be deleted (consumed)
        const userId = await consumeEmailVerificationToken(token);

        console.log('RETURNED VALUE: ' + userId)
            
        if (userId === undefined) {
            console.log('user not verified');
            response.status(403).send( { msg: 'token not found or expired!' } );
            return ;
        }

        // set user as validated

        // set jwt tokens in httpOnly cookies to mitigate XSS attacks
        setJwtTokensAsHttpOnlyCookies(1, response);

        // set CSRF cookies to mitigate CSRF attacks
        setCSRFcookies(response);

        console.log('user verified successfully');

        response.sendStatus(201);
    }
    catch (err) {
        // response.status(500).send( { msg: err } );  
    }
}
