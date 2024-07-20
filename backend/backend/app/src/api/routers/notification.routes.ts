import { Router } from "express";
// import { validateCSRFCookies, validateJwtToken } from "../middlewares/authorization.js";
import { notificationController } from "../controllers/notification.controller.js";


const   router = Router();


// router.use(validateJwtToken);
// router.use(validateCSRFCookies);

router.get('/notification', notificationController)


export default router;