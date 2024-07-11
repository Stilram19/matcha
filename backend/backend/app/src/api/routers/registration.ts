import { Router } from "express";
import { validateLocalSignupBody } from "../middlewares/registration.js";
import { validateAuthToken } from "../middlewares/validateAuthToken.js";
import { localStrategyController } from "../controllers/authentication.js";
import { emailVerficiationController } from "../controllers/registration.js";

const router = Router();

router.post('/signup/local', validateLocalSignupBody, localStrategyController);
router.post('/emailVerification', validateAuthToken, emailVerficiationController);

export default router;