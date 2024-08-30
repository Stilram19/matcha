import { ApplicationError } from "./ApplicationError.js";
import HttpError from "./HttpError.js";


export function getHttpError(error: unknown) : HttpError {
    // console.log(error);
    if (error instanceof HttpError)
        return error;

    return new HttpError(500, 'Something went wrong!');
}

export function getApplicationError(error: unknown) : ApplicationError {
    // console.log(error);
    if (error instanceof ApplicationError)
        return error;

    return new ApplicationError('something went wrong');
}