import { Request, Response } from 'express'

export async function discordCallback(request: Request, response: Response) {
    const user = request.user as any;

    console.log('userInCallback: ' + user);
}
