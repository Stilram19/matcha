import { Router } from "express";
import { validateForgotPassword, validateLocalLoginBody, validateResetPassword } from "../middlewares/authentication.js";
import { forgetPasswordController, localStrategyController, logoutUserController, resetPasswordController } from "../controllers/authentication.js";
import { validateAuthToken } from "../middlewares/validateAuthToken.js";
import { validateCSRFCookies, validateJwtToken } from "../middlewares/authorization.js";

const router = Router();

router.post('/login/local', validateLocalLoginBody, localStrategyController);
router.post('/login/google');
router.post('/forgotPassword', validateForgotPassword, forgetPasswordController);
router.patch('/resetPassword', validateAuthToken, validateResetPassword, resetPasswordController);
router.post('/logout', validateJwtToken, validateCSRFCookies, logoutUserController);

export default router;