import {Request, Response, NextFunction } from 'express'
import { isEmailFormatValid, isFirstNameValid, isLastNameValid, isPasswordValid, isUsernameValid } from '../validators/userCredentials.js';
import { formError } from '../helpers/errorFactory.js';

export function validateLocalSignupBody(request: Request, response: Response, next: NextFunction): void {
    const { email, username, firstname, lastname, password } = request.body;

    const requiredFields = { email, username, firstname, lastname, password };

    for (const field in requiredFields) {
        if (!requiredFields[field as keyof typeof requiredFields] || typeof requiredFields[field as keyof typeof requiredFields] !== 'string') {
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
