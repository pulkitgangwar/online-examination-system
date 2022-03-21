import { Router } from "express";
import { Quiz } from "../controllers/Quiz";

const router = Router();

router.get("/", Quiz.home);
router.get("/add", Quiz.showAddQuiz);
router.post("/add/callback", Quiz.addQuiz);

export default router;
