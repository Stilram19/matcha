import { Request, Response, NextFunction } from 'express'
import { formError } from '../helpers/errorFactory.js';
import { isFirstNameValid, isGenderAndSexualPreferenceValid, isLastNameValid, isUsernameValid } from '../validators/userCredentials.js';

export function validateCompleteProfileBody(request: Request, response: Response, next: NextFunction): void {
    const { username, firstname, biography, lastname, gender, sexualPreference } = request.body;

    const requiredFields = { username, firstname, lastname, gender, biography, sexualPreference };

    for (const field in requiredFields) {
        if (requiredFields[field as keyof typeof requiredFields] == undefined || typeof requiredFields[field as keyof typeof requiredFields] !== 'string') {
            response.status(400).send(formError(field, `${field} is required`));
            return;
        }
    }

    if (username && !isUsernameValid(username)) {
        response.status(400).send(formError('username', 'invalid username'));
        return ;
    }

    if (firstname && !isFirstNameValid(firstname)) {
        response.status(400).send(formError('firstname', 'invalid firstname'));
        return ;
    }

    if (lastname && !isLastNameValid(lastname)) {
        response.status(400).send(formError('lastname', 'invalid lastname'));
        return ;
    }
 
    if (!isGenderAndSexualPreferenceValid(gender, sexualPreference)) {
        response.status(400).send(formError('sexualPreference', 'invalid gender and sexual preference combination'))
        return ;
    }

    if (biography.length > 150) {
        response.status(400).send(formError('biography', 'too long biography, it must be no more than 150 characters'));
        return ;
    }

    next();
}
