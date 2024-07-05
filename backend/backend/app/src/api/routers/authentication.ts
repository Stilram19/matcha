import { Router } from "express";
import { validateForgotPassword, validateLocalLoginBody, validateResetPassword } from "../middlewares/authentication.js";
import { forgetPassword, localStrategy, resetPassword } from "../controllers/authentication.js";
import { validateAuthToken } from "../middlewares/validateAuthToken.js";

const router = Router();

router.post('/login/local', validateLocalLoginBody, localStrategy);
router.post('/login/google');
router.post('/forgotPassword', validateForgotPassword, forgetPassword);
router.patch('/resetPassword', validateAuthToken, validateResetPassword, resetPassword);
router.get('/logout');

export default router;