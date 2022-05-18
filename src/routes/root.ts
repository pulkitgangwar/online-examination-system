import { Router } from "express";
import { Root } from "../controllers/Root";
const router = Router();

router.get("/", Root.home);
router.get("/profile", Root.showUserProfile);
router.get("/invigilate", Root.invigilate);
router.post("/quiz/report", Root.generateReport);

// router.get("/all-quiz", Root.readQuiz);

export default router;
