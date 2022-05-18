import { Router } from "express";
import { Root } from "../controllers/Root";
const router = Router();

router.get("/", Root.home);
router.get("/profile", Root.showUserProfile);
router.get("/quiz/start/:quizId", Root.startQuiz);
router.post("/quiz/report", Root.generateReport);
router.get("/reports", Root.showAllReports);
router.get("/report/:reportId", Root.showReport);

// router.get("/all-quiz", Root.readQuiz);

export default router;
