import { Router } from "express";
import { verifyAccessToken } from "../middlewares/verifyAccessToken.js";
import chatRouter from "./chat.routes.js"


const router = Router();

router.use(verifyAccessToken);
router.use(chatRouter);

export default router;