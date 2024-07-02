import { Request, Response } from 'express'

export async function localStrategy(request: Request, response: Response) {
    const username = request.body as string;
    const password = request.body as string;

    // if (isLoginValid(username, password) == false) {
    //     response.status().
    // }
}
