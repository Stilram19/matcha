import { Request, Response } from "express";
import { getHttpError } from "../helpers/getErrorObject.js";
import { getVisitsHistoryService, visitProfileService } from "../services/history.js";



export async function getVisitsHistory(request: Request, response: Response) {

    const userId = request.user.id;
    const page = Number(request.query.page) || 0;
    const pageSize = Number(request.query.pageSize) || 20;

    try {

        const   history = await getVisitsHistoryService(userId, page, pageSize);
    
        response.json(history);
    } catch (e) {
        const { status, message } = getHttpError(e);
        response.status(status).json({status, message});
    }

}

export async function visitProfile(request: Request, response: Response) {

    const userId = request.user.id;
    const visitedUserId = Number(request.params.userId);

    try {
        await visitProfileService(userId, visitedUserId);
        response.sendStatus(201);
    } catch (e) {
        const { status, message } = getHttpError(e);
        response.status(status).json({status, message});
    }
}