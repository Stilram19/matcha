import { Router } from "express";
import authenticationRouter from './authentication.js'
import registrationRouter from './registration.js'
import profileRouter from './profile.js'

const router = Router();

router.use(authenticationRouter);
router.use(registrationRouter);
router.use(profileRouter);

export default router;