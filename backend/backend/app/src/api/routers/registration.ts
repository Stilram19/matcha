import { Router } from "express";
import { validateLocalSignupBody } from "../middlewares/registration.js";
import { emailVerficiation, localStrategy } from "../controllers/registration.js";
import { validateAuthToken } from "../middlewares/validateAuthToken.js";

const router = Router();

router.post('/signup/local', validateLocalSignupBody, localStrategy);
router.post('/emailVerification', validateAuthToken, emailVerficiation);

export default router;