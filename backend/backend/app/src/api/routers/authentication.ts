import { Router } from "express";
import { validateLocalLoginBody } from "../middlewares/authentication.js";
import { localStrategy } from "../controllers/authentication.js";

const router = Router();

router.post('/login/local', validateLocalLoginBody, localStrategy);
router.post('/login/google');
router.get('/logout');

export default router;