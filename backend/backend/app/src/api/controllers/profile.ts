import { Request, Response } from 'express'
import { retrieveProfileInfos } from '../services/profile.js';

export async function getProfileInfos(request: Request, response: Response) {
    const { userIdParam } = request.params;

    if (!userIdParam || typeof userIdParam != 'string') {
        response.status(400).send( { msg: 'invalid userId' } );
        return ;
    }

    const userId = Number(userIdParam);

    const profileInfos = await retrieveProfileInfos(userId);

    if (!profileInfos) {
        response.status(404).send( { msg: 'user not found' } );
        return ;
    }

    return (profileInfos);
}
