import {Request, Response, NextFunction } from 'express'
import { isEmailFormatValid, isFirstNameValid, isLastNameValid, isPasswordValid, isUsernameValid } from '../validators/userCredentials.js';
import { formError } from '../helpers/errorFactory.js';

export function validateLocalSignupBody(request: Request, response: Response, next: NextFunction): void {
    const { email, username, firstname, lastname, password } = request.body;

    const requiredFieds = [email, username, firstname, lastname, password];

    for (const field of requiredFieds) {
        if (!field || typeof field !== 'string') {
            response.status(400).send(formError(field, `${field} is required`));
            return;
        }
    }

    if (!isEmailFormatValid(email as string) || !isPasswordValid(password as string) 
        || !isUsernameValid(username as string) || !isFirstNameValid(firstname as string) 
            || !isLastNameValid(lastname as string)) {
        response.status(400).send( { msg: 'invalid email or password input' } );
        return ;
    }
                
    next();
}
