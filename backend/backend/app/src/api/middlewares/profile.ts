import { Request, Response, NextFunction } from 'express'

export function validateUserIdParam(request: Request, response: Response, next: NextFunction) {
    const { userId } = request.params;

    if (!userId || typeof userId != 'string') {
        response.status(400).send( { msg: 'invalid userId' } );
        return ;
    }

    next();
}
