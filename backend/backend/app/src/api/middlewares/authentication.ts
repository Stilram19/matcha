import {Request, Response, NextFunction } from 'express'
import { isPasswordValid, isUsernameValid } from '../validators/userCredentials.js';

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
