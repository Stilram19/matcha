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