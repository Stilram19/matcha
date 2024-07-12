import { Request, Response } from 'express'
import { formError } from '../helpers/errorFactory.js';
import { clearJwtCookies, setCSRFcookies, setJwtTokensAsHttpOnlyCookies } from '../utils/cookies.js';
import { consumeEmailVerificationTokenService, isNewEmailService, isNewUsernameService, saveEmailVerificationTokenService, saveUserSignUpCredentialsService } from '../services/registration.js';
import { generateRandomTokenService, hashDataWithSaltService } from '../services/hashing.js';
import { sendEmailVerificationService } from '../services/mailService.js';

export async function localStrategyController(request: Request, response: Response): Promise<void> {
    try {
        const email = request.body.email as string;
        const username = request.body.username as string;
        const firstname = request.body.firstname as string;
        const lastname = request.body.lastname as string;
        const password = request.body.password as string;

        console.log('cookies: ' + request.cookies['AccessToken']);

        clearJwtCookies(response);

        // checking that the email is not already in use
        if (await isNewEmailService(email) == false) {
            response.status(400).send( formError('email', 'Please use a different email address') );
            return ;
        }

        // checking that the username is not already in use
        if (await isNewUsernameService(username) == false) {
            response.status(400).send( formError('username', 'Please use a different username') );
            return ;
        }

        // hash password with salt and save user credentials
        const [hashedPassword, salt] = await hashDataWithSaltService(password);

        saveUserSignUpCredentialsService(email, username, firstname, lastname, hashedPassword, salt);

        const verificationToken = generateRandomTokenService(16);

        // wait until the token is stored
        await saveEmailVerificationTokenService(verificationToken);

        console.log(`firstname: ${firstname}`);

        // send email verification without blocking the user
        sendEmailVerificationService(email, firstname, verificationToken).catch(err => {
            console.log('error sending the verification email!');
        });

        response.status(201).send( { msg: 'Registration successful. Please check your email to verify your account.' } );
    }
    catch (err) {
        // response.sendStatus(500);
    }
}

export async function emailVerficiationController(request: Request, response: Response): Promise<void> {
    try {
        // the token is already checked in the previous middleware
        const authHeader = request.headers['authorization'] as string;
        const token = authHeader.split(' ')[1] as string;

        // verifying the token, if it exists it will be deleted (consumed)
        const userId = await consumeEmailVerificationTokenService(token);

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
