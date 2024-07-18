import { Router } from "express";
import { validateCSRFCookies, validateJwtToken } from "../middlewares/authorization.js";
import { validateRecommendedProfilesBody } from "../middlewares/explore.js";
import { getRecommendedProfiles } from "../controllers/explore.js";

const router = Router();

router.use(validateJwtToken);
router.use(validateCSRFCookies);

router.post('/recommendedProfiles', validateRecommendedProfilesBody, getRecommendedProfiles);

export default router;