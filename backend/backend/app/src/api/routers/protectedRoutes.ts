import { Router } from "express";
import { verifyAccessToken } from "../middlewares/verifyAccessToken.js";
import chatRouter from "./chat.routes.js"
import notificationRouter from "./notification.routes.js"


const router = Router();

// router.use(verifyAccessToken);
router.use(chatRouter);
router.use(notificationRouter);

export default router;