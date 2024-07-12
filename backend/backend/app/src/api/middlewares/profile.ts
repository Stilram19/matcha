import { Request, Response, NextFunction } from 'express'
import { getUserIdFromJwtService } from '../services/jwt.js';
import { isBlockedService } from '../services/profile.js';

export function validateUserIdParam(request: Request, response: Response, next: NextFunction) {
    const { userId } = request.params;

    if (!userId || typeof userId != 'string') {
        response.status(400).send( { msg: 'invalid userId' } );
        return ;
    }

    next();
}

export async function blockMiddleware(request: Request, response: Response, next: NextFunction) {
    const accessToken = request.cookies['AccessToken'] as string;
    const { userId } = getUserIdFromJwtService(accessToken);
    const visitedUserId = Number(request.params.userId);

    if (await isBlockedService(userId as number, visitedUserId) === true) {
        response.sendStatus(403);
        return ;
    }

    next();
}
