import { Router } from "express";
import { validateJwtToken } from "../middlewares/authentication.js";

const router = Router();

router.get('/profile/:userId', validateJwtToken);

export default router;