import { Router } from "express";
import authenticationRouter from './authentication.js'
import registrationRouter from './registration.js'

const router = Router();

router.use(authenticationRouter);
router.use(registrationRouter);

export default router;