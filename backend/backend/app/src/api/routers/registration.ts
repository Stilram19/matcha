import { Router } from "express";
import { validateLocalSignupBody } from "../middlewares/registration.js";
import { emailVerficiation, localStrategy } from "../controllers/registration.js";

const router = Router();

router.post('/signup/local', validateLocalSignupBody, localStrategy);
router.get('/emailVerification', emailVerficiation);

export default router;