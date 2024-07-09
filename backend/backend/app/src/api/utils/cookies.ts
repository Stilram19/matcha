import { Response } from 'express'
import { generateAccessTokenService, generateRefreshTokenService } from '../services/jwt.js';
import { generateRandomTokenService } from '../services/hashing.js';

export function setJwtTokensAsHttpOnlyCookies(userId: number, response: Response) {
    const accessToken = generateAccessTokenService(userId);
    const refreshToken = generateRefreshTokenService(userId);

    response.cookie('AccessToken', accessToken, {
        httpOnly: true,
        sameSite: 'none'
    });

    response.cookie('RefreshToken', refreshToken, {
        httpOnly: true,
        sameSite: 'none'
    });
}

export function setCSRFcookies(response: Response) {
    const csrfCookie = generateRandomTokenService(32);

    response.cookie('csrfSecretCookie', csrfCookie, {
        httpOnly: true,
        sameSite: 'none'
    });

    response.cookie('csrfClientExposedCookie', csrfCookie, {
        httpOnly: false,
        sameSite: 'none'
    });
}

export function setAccessTokensCookie(userId: number, response: Response) {
    const accessToken = generateAccessTokenService(userId);

    response.cookie('AccessToken', accessToken, {
        httpOnly: true,
        sameSite: 'none'
    });
}

export function clearJwtCookies(response: Response) {
    response.clearCookie('AccessToken');
    response.clearCookie('RefreshToken');
}

export function clearCSRFCookies(response: Response) {
    response.clearCookie('csrfSecretCookie');
    response.clearCookie('csrfClientExposedCookie');
}
