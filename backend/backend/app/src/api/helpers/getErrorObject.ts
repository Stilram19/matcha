import HttpError from "./HttpError.js";


export function getErrorObject(error: unknown) : HttpError {
    // console.log(error);
    if (error instanceof HttpError)
        return error;

    return new HttpError(500, 'Something went wrong!');
}