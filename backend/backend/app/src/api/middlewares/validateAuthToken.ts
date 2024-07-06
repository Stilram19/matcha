import { Request, Response, NextFunction } from "express";
import { extractAuthToken } from "../services/authToken.js";

export function validateAuthToken(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers['authorization'];
    const token = extractAuthToken(authHeader);

    if (!token) {
        console.log('auth middleware failed!');
        response.status(400).send( { msg: 'invalid or missing token' } );
    }
    console.log('auth middleware passed!');
    next();
}
