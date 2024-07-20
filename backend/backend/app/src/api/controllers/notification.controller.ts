import { Request, Response } from 'express';
import { getHttpError } from '../helpers/getErrorObject.js';
import { retrieveNotifications } from '../services/notification.service.js';



export async function notificationController(request: Request, response: Response) {
    const   userId = request.user.id;  

    try {
        const notifications = await retrieveNotifications(userId);
        response.json(notifications);
    } catch (e) {
        const {status, message} = getHttpError(e);
        response.status(status).json({status, message});
    }

}