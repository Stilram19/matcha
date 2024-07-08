import { Router } from "express";
import { getBriefProfileInfos, getProfileInfos } from "../controllers/profile.js";
import { validateUserIdParam } from "../middlewares/profile.js";
import { validateJwtToken, validateCSRFCookies } from "../middlewares/authorization.js";

const router = Router();

router.use(validateJwtToken);
router.use(validateCSRFCookies);

router.get('/profileInfos/:userId', validateUserIdParam, getProfileInfos);
router.get('/briefProfileInfos/:userId', validateUserIdParam, getBriefProfileInfos);
// router.patch('/profileInterests', updateInterests);
// router.patch('/profilePicture', updateProfilePicture);
// router.post('/block/:userId', blockUser);
// router.post('/reportFakeAccount/:userId', reportFakeAccount);
// router.post('/likeProfile/:userId', likeProfile);
// router.post('/unlikeProfile/:userId', unlikeProfile);

export default router;