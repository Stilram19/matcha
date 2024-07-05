import { Request, Response } from 'express'
import { changePassword, isEmailValid, isLoginValid, saveResetPasswordToken } from '../services/authentication.js';
import { sendForgetPasswordEmail } from '../services/mailService.js';
import { generateRandomToken } from '../services/hashing.js';
import { setCSRFcookies, setJwtTokensAsHttpOnlyCookies } from '../utils/cookies.js';

export async function localStrategy(request: Request, response: Response): Promise<void> {
    const username = request.body.username as string;
    const password = request.body.password as string;

    if (await isLoginValid(username, password) == false) {
        response.status(403).send( { msg: 'invalid username or password' } );
        return ;
    }

    console.log('logged in successfully');
 
    // set jwt tokens in httpOnly cookies to mitigate XSS attacks
    setJwtTokensAsHttpOnlyCookies(1, response);

    // set CSRF cookies to mitigate CSRF attacks
    setCSRFcookies(response);

    response.status(201).send( { msg: 'logged in successfully' } )
}

export async function forgetPassword(request: Request, response: Response): Promise<void> {
    const email = request.body.email as string;

    if (await isEmailValid(email) == false) {
        response.status(403).send( { msg: 'invalid email address' } );
        return ;
    }

    const resetToken = generateRandomToken(16);

    await saveResetPasswordToken(email, resetToken);

    sendForgetPasswordEmail(email, resetToken);

    response.status(201).send( { msg: 'email sent' } );
    return ;
}

export async function resetPassword(request: Request, response: Response) {
    const authHeader = request.headers['authorization'] as string;
    const resetToken = authHeader.split(' ')[1] as string;
    const password = request.body.password as string;

    const userId = await changePassword(resetToken, password);

    if (userId === undefined) {
        response.status(403).send( { msg: 'resetToken invalid or expired' } );
        return ;
    }

    // deconnect user from all sessions

    response.status(201).send( { msg: 'password changed!' } );
}
