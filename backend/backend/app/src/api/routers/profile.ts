import { Router } from "express";
import { blockUserController, getBriefProfileInfosController, getCurrProfileInfosController, getCurrBriefProfileInfosController, getProfileInfosController, likeProfileController, reportFakeAccountController, unlikeProfileController, updateInterestsController, updatePersonalInfosController} from "../controllers/profile.js";
import { blockMiddleware, validateUserIdParam } from "../middlewares/profile.js";
import { validateJwtToken, validateCSRFCookies } from "../middlewares/authorization.js";
import { validateCompleteProfileBody } from "../middlewares/complete-info.js";
import upload from "../middlewares/upload.js";

const router = Router();

router.use(validateJwtToken);
router.use(validateCSRFCookies);

router.get('/profileInfos/:userId', validateUserIdParam, blockMiddleware, getProfileInfosController);
router.get('/currUserProfileInfos', getCurrProfileInfosController);
router.get('/currUserBriefProfileInfos', getCurrBriefProfileInfosController);
router.get('/briefProfileInfos/:userId', validateUserIdParam, blockMiddleware, getBriefProfileInfosController);
router.patch('/profileInterests', updateInterestsController);
router.post('/block/:userId', validateUserIdParam, blockMiddleware, blockUserController);
router.post('/reportFakeAccount/:userId',validateUserIdParam, blockMiddleware, reportFakeAccountController);
router.post('/likeProfile/:userId', validateUserIdParam, blockMiddleware, likeProfileController);
router.post('/unlikeProfile/:userId', validateUserIdParam, blockMiddleware, unlikeProfileController);
router.post('/updatePersonalInfos', upload.single('profilePicture'), validateCompleteProfileBody, updatePersonalInfosController);

export default router;