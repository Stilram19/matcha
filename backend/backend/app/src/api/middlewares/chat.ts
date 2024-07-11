import { NextFunction, Request, Response } from 'express';
import { isIdValid } from '../validators/generalValidators.js';


export function validateDmParam(request: Request, response: Response, next: NextFunction) {

    if (!request.params.id || !isIdValid(request.params.id)) {
        response.status(400).json({status: 400, msg: "Invalid Id"})
        return ;
    }

    next();
}