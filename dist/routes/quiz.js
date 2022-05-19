"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Quiz_1 = require("../controllers/Quiz");
const router = (0, express_1.Router)();
router.get("/", Quiz_1.Quiz.allQuiz);
router.get("/add", Quiz_1.Quiz.addQuiz);
router.post("/add/callback", Quiz_1.Quiz.addQuizCallback);
router.get("/edit/:quizId", Quiz_1.Quiz.editQuiz);
router.post("/edit/callback", Quiz_1.Quiz.editQuizCallback);
router.delete("/delete/:quizId", Quiz_1.Quiz.deleteQuiz);
exports.default = router;
//# sourceMappingURL=quiz.js.map