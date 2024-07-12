import { Router } from "express";
import authenticationRouter from './authentication.js'
import registrationRouter from './registration.js'
import profileRouter from './profile.js'
import completeProfileRouter from './complete-profile.js'

const router = Router();

router.use(authenticationRouter);
router.use(registrationRouter);
router.use(profileRouter);
router.use(completeProfileRouter);

export default router;