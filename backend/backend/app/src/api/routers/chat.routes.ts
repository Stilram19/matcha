import { Router } from "express";
import { getConversationDetails, getDirectMessageList, getDmHistory, getFavoritesChat, getParticipantInfo } from "../controllers/chat.controller.js";
import { validateDmParam } from "../middlewares/chat.js";


const router = Router();

router.get('/chat/dms', getDirectMessageList);
router.get('/chat/favorites', getFavoritesChat);
// ! add block middleware for these two endpoint
router.get('/chat/conversation_details/:id', validateDmParam, getConversationDetails)
router.get('/chat/participant/:id', validateDmParam, getParticipantInfo)
router.get('/chat/dms/:id', validateDmParam, getDmHistory);


export default router;