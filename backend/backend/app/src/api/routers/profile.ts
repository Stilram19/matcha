import { Router } from "express";
import { validateCSRFCookies, validateJwtToken } from "../middlewares/authentication.js";
import { getProfileInfos } from "../controllers/profile.js";

const router = Router();

router.use(validateJwtToken);
router.use(validateCSRFCookies);

router.get('/profileInfos/:userId', getProfileInfos);
// router.get('/briefProfileInfos/:userId', getBriefProfileInfos);
// router.patch('/profileInterests/:userId', updateInterests);
// router.patch('/profilePicture/:userId', updateProfilePicture);
// router.post('/block', blockUser);

export default router;