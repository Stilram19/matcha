import { Router } from "express";
import { getSearchResult } from "../controllers/search.js";



const router = Router();

// add middleware that checks for the search query if it empty
router.get('/search', getSearchResult);

export default router;