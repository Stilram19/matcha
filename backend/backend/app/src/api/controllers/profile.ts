import { Request, Response } from 'express'
import { retrieveBriefProfileInfos, retrieveProfileInfos } from '../services/profile.js';

export async function getProfileInfos(request: Request, response: Response) {
    const userId = Number(request.params.userId);

    const profileInfos = await retrieveProfileInfos(userId);

    if (!profileInfos) {
        response.status(404).send( { msg: 'user not found' } );
        return ;
    }

    response.status(200).send( { profileInfos } );
}

export async function getBriefProfileInfos(request: Request, response: Response) {
    const userId = Number(request.params.userId);

    const profileInfos = await retrieveBriefProfileInfos(userId);

    if (!profileInfos) {
        response.status(404).send( { msg: 'user not found' } );
        return ;
    }

    response.status(200).send( { profileInfos } );
}

// export async function updateInterests(request: Request, response: Response) {

//     const { interests } = request.body;

//     await updateUserInterests(userId);
// }
