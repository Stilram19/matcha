import { Router } from "express";
import { validateCSRFCookies, validateJwtToken } from "../middlewares/authorization.js";
import { completeInterestsController, completePersonalInfosController, completePhotosController } from "../controllers/complete-profile.js";
import upload from "../middlewares/upload.js";
import { checkIfAlreadyCompleted, validateCompleteProfileBody } from "../middlewares/complete-info.js";

const router = Router();

router.use(validateJwtToken);
router.use(validateCSRFCookies);
router.use(checkIfAlreadyCompleted);

router.post('/completeprofileInterests', completeInterestsController);
router.post('/completeProfilePhotos', upload.array('image'), completePhotosController);
router.post('/completePersonalInfos', upload.single('profilePicture'), validateCompleteProfileBody, completePersonalInfosController);

export default router;
