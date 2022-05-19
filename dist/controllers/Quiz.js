"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quiz = void 0;
const nanoid_1 = require("nanoid");
const client_1 = require("../config/client");
const parseTime_1 = require("../utils/parseTime");
const parseDate_1 = require("../utils/parseDate");
const parseDateAndTime_1 = require("../utils/parseDateAndTime");
class Quiz {
    static allQuiz(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const quizzes = yield client_1.prisma.quiz.findMany({
                orderBy: { createdAt: "desc" },
                include: {
                    User: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            });
            const information = {};
            if ("_success" in req.query) {
                information.success = req.query["_success"];
            }
            if ("_error" in req.query) {
                information.error = req.query["_error"];
            }
            res.render("quiz/all-quiz", {
                quizzes: quizzes
                    .filter((quiz) => new Date() <= new Date(quiz.endingDate))
                    .map((quiz) => (Object.assign(Object.assign({}, quiz), { isEditable: quiz.userId === req.user.id, isActive: new Date() >= new Date(quiz.startingDate), timeLimitInFormat: (0, parseTime_1.parseTime)(quiz.timeLimit * 60), startingDateInFormat: (0, parseDateAndTime_1.parseDateAndTime)(quiz.startingDate.toISOString()).trim(), endingDateInFormat: (0, parseDate_1.parseDate)(quiz.endingDate.toISOString()).trim() }))),
                information,
            });
        });
    }
    static addQuiz(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.render("quiz/add-quiz", {
                route: "showaddquiz route",
            });
        });
    }
    static addQuizCallback(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const quiz = req.body;
                const newQuiz = yield client_1.prisma.quiz.create({
                    data: {
                        userId: req.user.id,
                        id: (0, nanoid_1.nanoid)(),
                        title: quiz.title,
                        semester: quiz.semester,
                        description: quiz.description,
                        endingDate: new Date(quiz.endingDate),
                        startingDate: new Date(quiz.startingDate),
                        timeLimit: parseInt(quiz.timeLimit),
                        marksPerQuestion: parseFloat(quiz.marksPerQuestion),
                        negativeMarksPerQuestion: parseFloat(quiz.negativeMarksPerQuestion),
                        subject: quiz.subject,
                        Questions: {
                            create: quiz.questions.map((question) => ({
                                id: (0, nanoid_1.nanoid)(),
                                question: question.question,
                                correctAnswer: question.correctAnswerIndex,
                                options: question.options,
                            })),
                        },
                    },
                });
                if (!newQuiz)
                    res.status(400).render("quiz/add-quiz", {
                        error: "Something went wrong please try again later",
                    });
                res.redirect("/quiz");
            }
            catch (err) {
                console.log(err);
                res.render("quiz/add-quiz", { error: err.message });
            }
        });
    }
    static editQuiz(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const quizId = req.params.quizId;
            const quiz = yield client_1.prisma.quiz.findFirst({
                where: { id: quizId },
                include: { Questions: true },
            });
            if (!quiz) {
                return res.redirect("/quiz");
            }
            res.render("quiz/edit-quiz", {
                id: quizId,
                error: "",
                quiz,
                startingDate: new Date(quiz.startingDate).toISOString().split(".")[0],
                endingDate: new Date(quiz.endingDate).toISOString().split(".")[0],
            });
        });
    }
    static editQuizCallback(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const quiz = req.body;
                console.log(quiz);
                res
                    .status(200)
                    .redirect("/quiz?_error=editing exams is not supported yet.");
                // const response = await prisma.quiz.update({
                //   where: { id: quiz.id },
                //   data: {
                //     title: quiz.title,
                //     description: quiz.description,
                //     endingDate: new Date(quiz.endingDate),
                //     startingDate: new Date(quiz.startingDate),
                //     timeLimit: parseInt(quiz.timeLimit),
                //     marksPerQuestion: parseFloat(quiz.marksPerQuestion),
                //     negativeMarksPerQuestion: parseFloat(quiz.negativeMarksPerQuestion),
                //     subject: quiz.subject,
                //     Questions: {
                //       create: quiz.questions
                //         .filter((question: any) => question.isNewQuestion)
                //         .map((question: any) => ({
                //           id: nanoid(),
                //           question: question.question,
                //           options: question.options,
                //           correctAnswer: question.correctAnswerIndex,
                //         })),
                //       update: quiz.questions
                //         .filter((question: any) => !question.isNewQuestion)
                //         .map((question: any) => ({
                //           id: question.id,
                //           question: question.question,
                //           options: question.options,
                //           correctAnswer: question.correctAnswerIndex,
                //         })),
                //       deleteMany: quiz.removedQuestions.map(
                //         (question: any) => question.id
                //       ),
                //     },
                //   },
                // });
                // if (response) {
                //   return res.status(200).redirect("/quiz?_success=updated the quiz");
                // }
            }
            catch (err) {
                console.log("error in quiz controller", err);
                res
                    .status(500)
                    .redirect("/quiz?_error=something went wrong please try again later");
            }
        });
    }
    static deleteQuiz(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!((_a = req.params) === null || _a === void 0 ? void 0 : _a.quizId))
                return res.redirect("/quiz?_error='id not provided'");
            yield client_1.prisma.quiz.delete({ where: { id: req.params.quizId } });
            res.redirect("/quiz?_success='quiz deleted successfully'");
        });
    }
}
exports.Quiz = Quiz;
//# sourceMappingURL=Quiz.js.map