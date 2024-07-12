import { Response } from 'express'
import { generateAccessTokenService, generateRefreshTokenService } from '../services/jwt.js';
import { generateRandomTokenService } from '../services/hashing.js';

export function setJwtTokensAsHttpOnlyCookies(userId: number, response: Response) {
    const accessToken = generateAccessTokenService(userId);
    const refreshToken = generateRefreshTokenService(userId);

    response.cookie('AccessToken', accessToken, {
        httpOnly: true,
        sameSite: 'lax'
    });

    response.cookie('RefreshToken', refreshToken, {
        httpOnly: true,
        sameSite: 'lax'
    });
}

export function setCSRFcookies(response: Response) {
    const csrfCookie = generateRandomTokenService(32);

    response.cookie('csrfSecretCookie', csrfCookie, {
        httpOnly: true,
        sameSite: 'lax' 
    });

    response.cookie('csrfClientExposedCookie', csrfCookie, {
        httpOnly: false,
        sameSite: 'lax'
    });
}

export function setAccessTokensCookie(userId: number, response: Response) {
    const accessToken = generateAccessTokenService(userId);

    response.cookie('AccessToken', accessToken, {
        httpOnly: true,
        sameSite: 'lax'
    });
}

export function setCompleteProfileInfosCookie(value: number, response: Response) {
    response.cookie('CompleteProfile', value, {
        httpOnly: false,
        sameSite: 'lax'
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

export function clearAllCookies(response: Response) {
    clearJwtCookies(response);
    clearCSRFCookies(response);
    response.clearCookie('CompleteProfile');
}
