import {Request, Response, NextFunction } from 'express'
import { isEmailFormatValid, isPasswordValid, isUsernameValid } from '../validators/userCredentials.js';

export function validateLocalSignupBody(request: Request, response: Response, next: NextFunction): void {
    const { email, username, password } = request.body;

    if (!email || !username || !password) {
        response.status(400).send( { msg: 'body must have username, email and password' } );
        return ;
    }

    if (typeof email != 'string' || typeof username != 'string' || typeof password != 'string') {
        response.status(400).send( { msg: 'username, email and password must all be of type string' } );
        return ;
    }

    if (!isEmailFormatValid(email) || !isPasswordValid(password) || !isUsernameValid(username)) {
        response.status(400).send( { msg: 'invalid username, email or password input' } );
        return ;
    }

    next();
}
