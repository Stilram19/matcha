import { Response } from 'express'
import { generateAccessToken, generateRefreshToken } from '../services/jwt.js';
import { generateRandomToken } from '../services/hashing.js';

export function setJwtTokensAsHttpOnlyCookies(userId: number, response: Response) {
    const accessToken = generateAccessToken(userId);
    const refreshToken = generateRefreshToken(userId);

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
    const csrfCookie = generateRandomToken(32);

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
    const accessToken = generateAccessToken(userId);

    response.cookie('AccessToken', accessToken, {
        httpOnly: true,
        sameSite: 'none'
    });
}

export function clearJwtCookies(response: Response) {
    response.clearCookie('AccessToken');
    response.clearCookie('RefreshToken');
}
