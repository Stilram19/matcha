import { Request, Response, NextFunction } from 'express'
import { clearCSRFCookies, clearJwtCookies, setAccessTokensCookie } from '../utils/cookies.js';
import { validateJwtAccessTokenService, validateJwtRefreshTokenService } from '../services/jwt.js';
import { extractAuthTokenService } from '../services/authToken.js';

export function validateJwtToken(request: Request, response: Response, next: NextFunction) {
    const accessToken = request.cookies['AccessToken'];
    const refreshToken = request.cookies['RefreshToken'];

    if (!accessToken || !refreshToken
        || typeof accessToken != 'string' || typeof refreshToken != 'string') {
        console.log('invalid jwt tokens: ' + accessToken + ' ' + refreshToken);
        clearJwtCookies(response);
        clearCSRFCookies(response);
        response.status(401).send({ err: 'not authorized' });
        return ;
    }

    const accessTokenResult = validateJwtAccessTokenService(accessToken);

    if (accessTokenResult.error == 'invalid token') {
        clearJwtCookies(response);
        clearCSRFCookies(response);
        response.status(401).send({ err: 'not authorized' });
        return ;
    }

    // console.log('expired access token!');
    
    if (accessTokenResult.error == 'expired token') {
        const { userId } = validateJwtRefreshTokenService(refreshToken);
        // console.log('refresh token id: ' + userId);

        if (userId === null) {
            // console.log('invalid refresh token!');
            clearJwtCookies(response);
            clearCSRFCookies(response);
            response.status(401).send({ err: 'not authorized' });
            return ;
        }

        setAccessTokensCookie(userId, response);
    }

    console.log(`JWT TOKENS VALIDATED!`);
    next();
}

export function validateCSRFCookies(request: Request, response: Response, next: NextFunction) {
    const secretCookie = request.cookies['csrfSecretCookie'];
    const authHeader = request.headers['authorization'];
    const clientAccessibleCookie = extractAuthTokenService(authHeader);

    if (!secretCookie || !clientAccessibleCookie
        || typeof secretCookie != 'string' || typeof clientAccessibleCookie != 'string') {
        clearJwtCookies(response);
        clearCSRFCookies(response);
        // send a notification to warn the user of a csrf attack attempt

        response.status(401).send( { msg: 'not authorized' } );
        return ;
    }

    if (secretCookie != clientAccessibleCookie) {
        // send a notification to warn the user of a csrf attack attempt
        clearJwtCookies(response);
        clearCSRFCookies(response);
        response.status(401).send( { msg: 'not authorized' } );
        return ;
    }

    console.log('CSRF validated');
    next();
}
