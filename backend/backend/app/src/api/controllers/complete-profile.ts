import { Request, Response } from 'express'
import { getUserIdFromJwtService } from "../services/jwt.js";
import { addUserInterestsService } from '../services/profile.js';
import { addUserPhotosService, updatePersonalInfosService } from '../services/complete-profile.js';

export async function completeInterestsController(request: Request, response: Response) {
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

export async function completePhotosController(request: Request, response: Response) {
    try {
        const files = request.files as Express.Multer.File[];

        if (!files) {
            response.status(400).send( { msg: 'upload error' } );
            return ;
        }

        const accessToken = request.cookies['AccessToken'] as string;
        const { userId } = getUserIdFromJwtService(accessToken);
        const photosPaths: string[] = files.map(file => file.path);

        await addUserPhotosService(userId as number, photosPaths);
        response.status(200).send({ message: 'Files uploaded successfully', files });
    } catch (error) {
        response.status(500).send({ message: 'Error uploading files' });
    }
}

export async function completePersonalInfosController(request: Request, response: Response) {
    const file = request.file as Express.Multer.File;

    let profilePicturePath = null;
    const username = request.body.username as string;
    const firstname = request.body.firstname as string;
    const lastname = request.body.lastname as string;
    const gender = request.body.gender as string;
    const biography = request.body.biography as string;
    const sexualPreference = request.body.sexualPreference as string;

    if (file) {
        profilePicturePath = file.path;
    }

    try {
        const personalInfos = {profilePicturePath, username, firstname, lastname, gender, biography, sexualPreference}
        await updatePersonalInfosService(personalInfos);

        response.status(201).send( { msg: 'personal infos completed!' } );
    }

    catch (err) {
        response.sendStatus(500);
    }
}
