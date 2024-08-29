import { Request, Response } from 'express'
import { getUserIdFromJwtService } from '../services/jwt.js';
import { Filters } from '../types/explore.js';
import { getRecommendedProfilesService } from '../services/explore.js';

export async function getRecommendedProfiles(request: Request, response: Response) {
    const fameRatingRange = request.body.fameRatingRange;
    const ageRange = request.body.ageRange;
    const interests = request.body.interests;
    const accessToken = request.cookies['AccessToken'] as string;
    const { userId } = getUserIdFromJwtService(accessToken);
    const filters: Filters = { fameRatingRange, ageRange };

    if (interests) {
        filters.interests = interests;
    }

    if (!userId) {
        response.sendStatus(500);
        return ;
    }

    try {
        const recommendedProfiles = await getRecommendedProfilesService( userId as number, filters);

        if (recommendedProfiles.length === 0) {
            console.log('no recommendedProfile');
        }

        console.log('recommendedProfiles: ' + recommendedProfiles);

        response.status(200).send( { recommendedProfiles } );
    }
    catch (err) {
        response.sendStatus(500);
    }
}
