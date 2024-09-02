import { Router } from "express";
import chatRouter from "./chat.routes.js"
import notificationRouter from "./notification.routes.js"


const router = Router();

router.use(chatRouter);
router.use(notificationRouter);

export default router;