import { Router } from "express";

const router = Router();

router.post('/login/local');
router.post('/login/google');
router.post('/logout');

export default router;