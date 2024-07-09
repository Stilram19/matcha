import { Router } from "express";
import { addInterestsController, blockUserController, getBriefProfileInfosController, getProfileInfosController, likeProfileController, reportFakeAccountController, unlikeProfileController, updateInterestsController, updateProfilePictureController } from "../controllers/profile.js";
import { blockMiddleware, validateUserIdParam } from "../middlewares/profile.js";
import { validateJwtToken, validateCSRFCookies } from "../middlewares/authorization.js";

const router = Router();

router.use(validateJwtToken);
router.use(validateCSRFCookies);

router.get('/profileInfos/:userId', validateUserIdParam, blockMiddleware, getProfileInfosController);
router.get('/briefProfileInfos/:userId', validateUserIdParam, blockMiddleware, getBriefProfileInfosController);
router.patch('/profileInterests', updateInterestsController);
router.post('/profileInterests', addInterestsController);
router.patch('/profilePicture', updateProfilePictureController);
router.post('/block/:userId', validateUserIdParam, blockMiddleware, blockUserController);
router.post('/reportFakeAccount/:userId',validateUserIdParam, blockMiddleware, reportFakeAccountController);
router.post('/likeProfile/:userId', validateUserIdParam, blockMiddleware, likeProfileController);
router.post('/unlikeProfile/:userId', validateUserIdParam, blockMiddleware, unlikeProfileController);

export default router;