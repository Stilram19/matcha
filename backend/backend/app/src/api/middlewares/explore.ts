import { Request, Response, NextFunction } from 'express'
import { isArray } from '../validators/generalPurpose.js';

export function validateRecommendedProfilesBody(request: Request, response: Response, next: NextFunction) {
    const { fameRatingRange, ageRange, interests } = request.body;


    if (!isArray(fameRatingRange, 2, 'number')) {
        response.status(400).send( { msg: 'invalid fameRatingRange' } );
        return ;
    }

    if (!isArray(ageRange, 2, 'number')) {
        response.status(400).send( { msg: 'invalid ageRange' } );
        return ;
    }

    if (interests && !isArray(interests, undefined, 'string')) {
        response.status(400).send( { msg: 'invalid interests' } );
        return ;
    }

    next();
}
