import {Request, Response, NextFunction } from 'express'
import { isEmailFormatValid, isPasswordValid, isUsernameValid } from '../validators/userCredentials.js';
import { validateJwtAccessToken, validateJwtRefreshToken } from '../services/jwt.js';
import { clearJwtCookies, setAccessTokensCookie, setJwtTokensAsHttpOnlyCookies } from '../utils/cookies.js';
import dotenv from 'dotenv'

dotenv.config();

export function validateLocalLoginBody(request: Request, response: Response, next: NextFunction): void {
    const { username, password } = request.body;
    const error = 'invalid username or password';

    if (!username || !password) {
        response.status(400).send( { msg: error } );
        return ;
    }

    if (typeof username != 'string' || typeof password != 'string') {
        response.status(400).send( { msg: error } );
        return ;
    }

    if (!isPasswordValid(password) || !isUsernameValid(username)) {
        response.status(400).send( { msg: error } );
        return ;
    }

    next();
}

export function validateForgotPassword(request: Request, response: Response, next: NextFunction) {
    const { email } = request.body;

    if (!email || !isEmailFormatValid(email)) {
        response.status(400).send( { msg: 'missing email or invalid email format' } );
        return ;
    }

    next();
}

export function validateResetPassword(request: Request, response: Response, next: NextFunction) {
    const { password } = request.body;

    if (!password || !isPasswordValid(password)) {
        response.status(400).send( { msg: 'missing or invalid password' } );
        return ;
    }

    next();
}

export function validateJwtToken(request: Request, response: Response, next: NextFunction) {
    const accessToken = request.cookies['AccessToken'];
    const refreshToken = request.cookies['RefreshToken'];

    if (!accessToken || !refreshToken
        || typeof accessToken != 'string' || typeof refreshToken != 'string') {
        clearJwtCookies(response);
        response.status(401).send( { msg: 'missing accessToken or refreshToken' } );
        return ;
    }

    const accessTokenResult = validateJwtAccessToken(accessToken);

    if (accessTokenResult.error == 'expired token') {
        const { userId } = validateJwtRefreshToken(refreshToken);

        if (userId === null) {
            clearJwtCookies(response);
            response.redirect(process.env.FRONTEND_LOGIN_PAGE_URL as string);
            return ;
        }

        setAccessTokensCookie(userId, response);
    }

    next();
}
