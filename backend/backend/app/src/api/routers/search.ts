import { Router } from "express";
import { getSearchResult } from "../controllers/search.js";



const router = Router();

router.get('/search', getSearchResult);

export default router;