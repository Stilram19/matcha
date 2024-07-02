import { Request, Response } from "express";
import { checkIdExists, getChatHistory, getContactDetails, getFavoriteUsers, retrieveDms } from "../services/chat.service.js";


export async function getDirectMessageList(request: Request, response: Response) {
    try {
        const dms = await retrieveDms(request.user.id);
        response.json(dms);
    } catch (e) {
        response.status(500).json({status: 500, msg: "Something Went Wrong"});
    }
}


export async function getDmHistory(request: Request, response: Response) {
    const participantId: number = +request.params.id;
    // console.log(participantId);

    try {
        if (!await checkIdExists(participantId)) {
            response.status(404).json("Not found");
            return ;
        }
        const chatHistory = await getChatHistory(request.user.id, participantId);
        response.json(chatHistory);
    } catch (e) {
        // later serialize the error to the correct format
        response.status(500).json({status: 500, msg: "Something Went Wrong"});
    }
}

export async function getConversationDetails(request: Request, response: Response) {
    const participantId: number = +request.params.id;

    try {
        if (!await checkIdExists(participantId)) {
            response.status(404).json("Not found");
            return ;
        }
        const conversationDetails = await getContactDetails(participantId);
        response.json(conversationDetails);
    } catch (e) {
        response.status(500).json({status: 500, msg: "Something went wrong"})
    }

}


export async function getFavoritesChat(request: Request, response: Response) {
    try {
        const favorites = await getFavoriteUsers(request.user.id);
        response.json(favorites);
    } catch (e) {
        response.status(500).json({status: 500, msg: "Something went wrong"});
    }
}