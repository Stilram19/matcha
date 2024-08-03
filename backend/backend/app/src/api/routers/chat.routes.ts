import { Router } from "express";
import { MarkMessagesAsRead, getConversationDetails, getDirectMessageList, getDmHistory, getFavoritesChat, getParticipantInfo, getUserContacts } from "../controllers/chat.controller.js";
import { validateDmParam } from "../middlewares/chat.js";
import { blockMiddleware } from "../middlewares/profile.js";


const router = Router();

router.get('/chat/dms', getDirectMessageList);
router.get('/chat/contacts', getUserContacts);
router.get('/chat/favorites', getFavoritesChat);
// ! add block middleware for these two endpoint
router.get('/chat/conversation_details/:userId', validateDmParam, blockMiddleware, getConversationDetails)
router.get('/chat/participant/:userId', validateDmParam, blockMiddleware, getParticipantInfo)
router.get('/chat/dms/:userId', validateDmParam, blockMiddleware, getDmHistory);
router.patch('/chat/dms/:userId/read', validateDmParam, blockMiddleware, MarkMessagesAsRead);
router.get('/blah', (req, res) => {
    console.log(req)
    console.log(req.cookies)

    res.json("hello")
});

// router.get('/cookie', (req, res) => {
//     res.cookie('blah', 'balh blah fgkdfjkgjd', {
//         httpOnly: true,
//         sameSite: 'none'
//     })

//     res.json("cookie")
// });




export default router;