import {Request, Response, NextFunction } from 'express'
import { isEmailFormatValid, isPasswordValid } from '../validators/userCredentials.js';

export function validateLocalSignupBody(request: Request, response: Response, next: NextFunction): void {
    const { email, password } = request.body;

    if (!email || !password) {
        response.status(400).send( { msg: 'body must have email and password' } );
        return ;
    }

    if (!isEmailFormatValid(email) || !isPasswordValid(password)) {
        response.status(400).send( { msg: 'invalid email or password input' } );
        return ;
    }

    next();
}
