import { Router } from "express";
import authenticationRouter from './authentication.js'
import registrationRouter from './registration.js'
import protectedRouter from './protectedRoutes.js'

const router = Router();

router.use(authenticationRouter);
router.use(registrationRouter);

router.use(protectedRouter);

export default router;