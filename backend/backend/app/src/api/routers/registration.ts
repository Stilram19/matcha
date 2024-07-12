import { Router } from "express";
import { validateLocalSignupBody } from "../middlewares/registration.js";
import { validateAuthToken } from "../middlewares/validateAuthToken.js";
import { emailVerficiationController, localStrategyController } from "../controllers/registration.js";

const router = Router();

router.post('/signup/local', validateLocalSignupBody, localStrategyController);
router.post('/emailVerification', validateAuthToken, emailVerficiationController);

export default router;