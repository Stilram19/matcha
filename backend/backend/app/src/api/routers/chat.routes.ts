import { Router } from "express";
import { MarkMessagesAsRead, addFavoriteContact, getConversationDetails, getDirectMessageList, getDmHistory, getFavoritesChat, getParticipantInfo, getUserContacts, removeFavoriteContact } from "../controllers/chat.controller.js";
import { validateDmParam, validateUserIdBody } from "../middlewares/chat.js";
import { blockMiddleware } from "../middlewares/profile.js";


const router = Router();

router.get('/chat/dms', getDirectMessageList);
router.get('/chat/contacts', getUserContacts);
router.get('/chat/favorites', getFavoritesChat);
router.get('/chat/conversation_details/:userId', validateDmParam, blockMiddleware, getConversationDetails)
router.get('/chat/participant/:userId', validateDmParam, blockMiddleware, getParticipantInfo)
router.get('/chat/dms/:userId', validateDmParam, blockMiddleware, getDmHistory);
router.patch('/chat/dms/:userId/read', validateDmParam, blockMiddleware, MarkMessagesAsRead);
router.post('/chat/favorite', validateUserIdBody, addFavoriteContact);
router.delete('/chat/favorite', validateUserIdBody, removeFavoriteContact);



export default router;