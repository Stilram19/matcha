import { Request, Response } from 'express';
import { getHttpError } from '../helpers/getErrorObject.js';
import { retrieveNotifications, notificationMarkAsReadService } from '../services/notification.service.js';



export async function notificationController(request: Request, response: Response) {
    const   userId = request.user.id;
    const   page = Number(request.query.page) || 0;
    const   pageSize = Number(request.query.pageSize) || 20;

    try {
        const notifications = await retrieveNotifications(userId, page, pageSize);
        response.json(notifications);
    } catch (e) {
        console.log(e);
        const {status, message} = getHttpError(e);
        response.status(status).json({status, message});
    }

}



export async function notificationMarkAsRead(request: Request, response: Response) {
    const   userId = request.user.id;

    try {
        await notificationMarkAsReadService(userId);
        response.sendStatus(200);
    } catch (e) {
        const {status, message} = getHttpError(e);
        response.status(status).json({status, message});
    }


}