import { Router } from "express";
import { usersController } from "../controllers/tests.js";

const router = Router();

router.get('/users', usersController);

export default router;