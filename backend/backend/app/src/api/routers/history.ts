import { Router } from "express";
import { getVisitsHistory, visitProfile } from "../controllers/history.js";
import { validateDmParam } from "../middlewares/chat.js";


const router = Router();


router.get('/history', getVisitsHistory);
router.post('/visit/:userId', validateDmParam, visitProfile)