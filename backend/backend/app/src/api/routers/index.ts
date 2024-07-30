import { Router } from "express";
import authenticationRouter from './authentication.js'
import registrationRouter from './registration.js'
import protectedRouter from './protectedRoutes.js'
import profileRouter from './profile.js'
import completeProfileRouter from './complete-profile.js'
import exploreRouter from './explore.js'

const router = Router();

router.use(authenticationRouter);
router.use(registrationRouter);

router.use(protectedRouter);
router.use(profileRouter);
router.use(completeProfileRouter);
router.use(exploreRouter);

export default router;