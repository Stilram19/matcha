import {Request, Response, NextFunction } from 'express'
import { isEmailFormatValid, isPasswordValid, isUsernameValid } from '../validators/userCredentials.js';

export function validateUsername(request: Request, response: Response, next: NextFunction): void {
    const { username } = request.body;

    if (!username || typeof username !== 'string') {
        response.status(400).send( { msg: 'username input not string or missing' } );
        return ;
    }

    if (isUsernameValid(username) == false) {
        response.status(400).send( { msg: 'Username must be between 8 and 12 characters long and can only contain letters, numbers, and underscores.' } );
        return ;
    }

    next();
}

export function validatePassword(request: Request, response: Response, next: NextFunction): void {
    const { password } = request.body;

    if (!password || typeof password != 'string') {
        response.status(400).send( { msg: 'Password not string or missing' } );
        return ;
    }

    if (isPasswordValid(password) == false) {
        response.status(400).send( { msg: 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character (like !@#$%^&*()). and must be between 12 and 28 characters long.' } );
        return ;
    }

    next();
}

export function validateEmail(request: Request, response: Response, next: NextFunction): void {
    const { email } = request.body;

    if (!email || typeof email != 'string') {
        response.status(400).send( { msg: 'Email not string or missing' } );
        return ;
    }

    if (isEmailFormatValid(email) == false) {
        response.status(400).send( { msg: 'invalid email format' } );
        return ;
    }

    next();
}
