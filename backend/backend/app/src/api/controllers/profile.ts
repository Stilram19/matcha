import { Request, Response } from 'express'
import { likeProfileService, blockUserService, reportFakeAccountService, retrieveBriefProfileInfosService, retrieveProfileInfosService, updateUserInterestsService, unlikeProfileService, addUserInterestsService } from '../services/profile.js';
import { getUserIdFromJwtService } from '../services/jwt.js';

export async function getProfileInfosController(request: Request, response: Response) {
    const userId = Number(request.params.userId);

    const profileInfos = await retrieveProfileInfosService(userId);

    if (!profileInfos) {
        response.status(404).send( { msg: 'user not found' } );
        return ;
    }

    response.status(200).send( { profileInfos } );
}

export async function getBriefProfileInfosController(request: Request, response: Response) {
    const userId = Number(request.params.userId);

    const profileInfos = await retrieveBriefProfileInfosService(userId);

    if (!profileInfos) {
        response.status(404).send( { msg: 'user not found' } );
        return ;
    }

    response.status(200).send( { profileInfos } );
}

export async function updateInterestsController(request: Request, response: Response) {
    const accessToken = request.cookies['AccessToken'] as string;
    const { userId } = getUserIdFromJwtService(accessToken);
    const { interests } = request.body;

    if (!interests || !Array.isArray(interests)) {
        response.status(400).send( { msg: 'bad interests request body' } );
        return ;
    }

    // console.log(`fine: ${interests}`);

    try {
        await updateUserInterestsService(userId as number, interests);
        response.sendStatus(200);
    }
    catch (err) {
        response.sendStatus(500);
    }
}

export async function addInterestsController(request: Request, response: Response) {
    const accessToken = request.cookies['AccessToken'] as string;
    const { userId } = getUserIdFromJwtService(accessToken);
    const { interests } = request.body;

    if (!interests || !Array.isArray(interests)) {
        response.status(400).send( { msg: 'bad interests request body' } );
        return ;
    }

    // console.log(`fine: ${interests}`);

    try {
        await addUserInterestsService(userId as number, interests);
        response.sendStatus(200);
    }
    catch (err) {
        response.sendStatus(500);
    }
}

export async function updateProfilePictureController(request: Request, response: Response) {

}

export async function blockUserController(request: Request, response: Response) {
    const accessToken = request.cookies['AccessToken'] as string;
    const { userId } = getUserIdFromJwtService(accessToken);
    const blockedUserId = Number(request.params.userId);

    // console.log('BlockingUserId: ' + userId);
    // console.log('BlockedUserId: ' + blockedUserId);

    if (userId === blockedUserId) {
        response.sendStatus(400);
        return ;
    }

    try {
        await blockUserService(userId as number, blockedUserId);

        response.sendStatus(201);
    }
    catch (err) {
        response.sendStatus(500);
    }
}

export async function reportFakeAccountController(request: Request, response: Response) {
    const accessToken = request.cookies['AccessToken'] as string;
    const { userId } = getUserIdFromJwtService(accessToken);
    const reportedUserId = Number(request.params.userId);

    if (userId === reportedUserId) {
        response.sendStatus(400);
        return ;
    }

    // console.log('reportingUserId: ' + userId);
    console.log('reportedUserId: ' + reportedUserId);

    try {
        await reportFakeAccountService(reportedUserId);

        response.sendStatus(201);
    }
    catch (err) {
        response.sendStatus(500);
    }
}

export async function likeProfileController(request: Request, response: Response) {
    const accessToken = request.cookies['AccessToken'] as string;
    const { userId } = getUserIdFromJwtService(accessToken);
    const likedUserId = Number(request.params.userId);

    // console.log('likingUserId: ' + userId);
    // console.log('likedUserId: ' + likedUserId);

    if (userId === likedUserId) {
        console.log('bad like request');
        response.sendStatus(400);
        return ;
    }    

    try {
        await likeProfileService(userId as number, likedUserId);

        response.sendStatus(201);
    }
    catch (err) {
        response.sendStatus(500);
    }
}

export async function unlikeProfileController(request: Request, response: Response) {
    const accessToken = request.cookies['AccessToken'] as string;
    const { userId } = getUserIdFromJwtService(accessToken);
    const unlikedUserId = Number(request.params.userId);

    // console.log('unlikingUserId: ' + userId);
    // console.log('unlikedUserId: ' + unlikedUserId);

    if (userId === unlikedUserId) {
        response.sendStatus(400);
        return ;
    }

    try {
        await unlikeProfileService(userId as number, unlikedUserId);

        response.sendStatus(201);
    }
    catch (err) {
        response.sendStatus(500);
    }
}
