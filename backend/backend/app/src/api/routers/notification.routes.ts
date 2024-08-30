import { Router } from "express";
// import { validateCSRFCookies, validateJwtToken } from "../middlewares/authorization.js";
import { notificationController, notificationMarkAsRead } from "../controllers/notification.controller.js";


const   router = Router();


// router.use(validateJwtToken);
// router.use(validateCSRFCookies);

router.get('/notification', notificationController)
router.patch('/notification/read', notificationMarkAsRead)



export default router;