import { Request, Response, NextFunction } from "express";

export function validateAuthToken(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
        console.log('auth middleware failed bad author!');
        response.status(400).send( { msg: 'authorization header missing' } );
        return ;
    }

    const tokenParts = authHeader.split(' ');

    if (tokenParts.length !== 2 || tokenParts[0] != 'Bearer') {
        console.log('auth middleware failed bad author!');
        response.status(400).send( { msg: 'bad authorization header format' } );
        return ;
    }

    const token = tokenParts[1];

    if (!token) {
        console.log('auth middleware failed no token!');
        response.status(400).send( { msg: 'no token found' } );
        return ;
    }
    console.log('auth middleware passed!');
    next();
}