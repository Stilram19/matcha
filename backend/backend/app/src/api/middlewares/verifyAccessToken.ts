import { NextFunction, Request, Response } from 'express';


export function verifyAccessToken(request: Request, response: Response, next: NextFunction) {
    // grant access, based on the token
    console.log("verifying Access token");
    request.user = {id: 1};
    next();
}