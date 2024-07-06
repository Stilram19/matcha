import { Request, Response } from "express";
import { getChatHistory, getContactDetails, getFavoriteUsers, retrieveDms } from "../services/chat.service.js";
import { getErrorObject } from "../helpers/getErrorObject.js";


export async function getDirectMessageList(request: Request, response: Response) {
    const   userId = request.user.id;
    console.log(`get dms of ${userId}`);

    try {
        const dms = await retrieveDms(userId);
        response.json(dms);
    } catch (e) {
        const {status, msg} = getErrorObject(e);
        response.status(status).json({status, msg});
    }
}


export async function getDmHistory(request: Request, response: Response) {
    const   participantId: number = +request.params.id;
    const   userId = request.user.id;

    // console.log(participantId);

    try {
        const chatHistory = await getChatHistory(userId, participantId);
        response.json(chatHistory);
    } catch (e) {
        const {status, msg} = getErrorObject(e);
        response.status(status).json({status, msg});
    }
}

export async function getConversationDetails(request: Request, response: Response) {
    const participantId: number = +request.params.id;

    try {
        const conversationDetails = await getContactDetails(participantId);
        response.json(conversationDetails);
    } catch (e) {
        const {status, msg} = getErrorObject(e);
        response.status(status).json({status, msg});
    }
}


export async function getFavoritesChat(request: Request, response: Response) {
    try {
        const favorites = await getFavoriteUsers(request.user.id);
        response.json(favorites);
    } catch (e) {
        const {status, msg} = getErrorObject(e);
        response.status(status).json({status, msg});
    }
}