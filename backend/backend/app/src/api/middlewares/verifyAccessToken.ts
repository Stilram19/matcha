import { NextFunction, Request, Response } from 'express';


export function verifyAccessToken(request: Request, response: Response, next: NextFunction) {
    // grant access, based on the token
    next();
}