import { Request, Response } from 'express'
import { clearCSRFCookies, clearJwtCookies, setCSRFcookies, setJwtTokensAsHttpOnlyCookies } from '../utils/cookies.js';
import { changePasswordService, isEmailValidService, isLoginValidService, saveResetPasswordTokenService } from '../services/authentication.js';
import { generateRandomTokenService } from '../services/hashing.js';
import { sendForgetPasswordEmailService } from '../services/mailService.js';

export async function localStrategyController(request: Request, response: Response): Promise<void> {
    const username = request.body.username as string;
    const password = request.body.password as string;

    if (await isLoginValidService(username, password) == false) {
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

export async function forgetPasswordController(request: Request, response: Response): Promise<void> {
    const email = request.body.email as string;

    if (await isEmailValidService(email) == false) {
        response.status(403).send( { msg: 'invalid email address' } );
        return ;
    }

    const resetToken = generateRandomTokenService(16);

    await saveResetPasswordTokenService(email, resetToken);

    sendForgetPasswordEmailService(email, resetToken);

    response.status(201).send( { msg: 'email sent' } );
    return ;
}

export async function resetPasswordController(request: Request, response: Response) {
    const authHeader = request.headers['authorization'] as string;
    const resetToken = authHeader.split(' ')[1] as string;
    const password = request.body.password as string;

    const userId = await changePasswordService(resetToken, password);

    if (userId === undefined) {
        response.status(403).send( { msg: 'resetToken invalid or expired' } );
        return ;
    }

    // deconnect user from all sessions

    response.status(201).send( { msg: 'password changed!' } );
}

export async function logoutUserController(request: Request, response: Response) {
    clearJwtCookies(response);
    clearCSRFCookies(response);
    response.status(401); // return unauthorized to make the client redirect to the login page
}
