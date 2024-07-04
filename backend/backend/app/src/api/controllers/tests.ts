import { Request, Response } from 'express'
import { getUsers } from '../services/test.js';

export async function usersController(request: Request, response: Response): Promise<void> {
    try {
        const users = await getUsers();

        response.status(200).send(users);
    }
    catch (err) {
        // response.status(500).send( { msg: err } );
    }
}
