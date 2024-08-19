import { Router } from "express";
import authenticationRouter from './authentication.js'
import registrationRouter from './registration.js'
import profileRouter from './profile.js'
import completeProfileRouter from './complete-profile.js'
import exploreRouter from './explore.js'
import oauthRouter from './oauth.js'

const router = Router();

router.use(authenticationRouter);
router.use(registrationRouter);
router.use(oauthRouter);
router.use(profileRouter);
router.use(completeProfileRouter);
router.use(exploreRouter);

export default router;