"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Root_1 = require("../controllers/Root");
const router = (0, express_1.Router)();
router.get("/", Root_1.Root.home);
router.get("/profile", Root_1.Root.showUserProfile);
router.get("/quiz/start/:quizId", Root_1.Root.startQuiz);
router.post("/quiz/report", Root_1.Root.generateReport);
router.get("/reports", Root_1.Root.showAllReports);
router.get("/report/:reportId", Root_1.Root.showReport);
router.get("/announcement", Root_1.Root.showAnnouncements);
// router.get("/all-quiz", Root.readQuiz);
exports.default = router;
//# sourceMappingURL=root.js.map