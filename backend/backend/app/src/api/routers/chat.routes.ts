import { Router } from "express";
import { getConversationDetails, getDirectMessageList, getDmHistory, getFavoritesChat } from "../controllers/chat.controller.js";
import { validateParams } from "../middlewares/chat.js";


const router = Router();

router.get('/chat/dms', getDirectMessageList);
router.get('/chat/favorites', getFavoritesChat);
router.get('/chat/conversation_details/:id', validateParams, getConversationDetails)
router.get('/chat/dms/:id', validateParams, getDmHistory);


export default router;