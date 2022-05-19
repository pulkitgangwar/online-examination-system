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
exports.Root = void 0;
const client_1 = require("../config/client");
const parseTime_1 = require("../utils/parseTime");
const parseDate_1 = require("../utils/parseDate");
const nanoid_1 = require("nanoid");
const parseDateAndTime_1 = require("../utils/parseDateAndTime");
class Root {
    static home(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const [quizzes, reports] = yield Promise.all([
                client_1.prisma.quiz.findMany({
                    where: {
                        semester: req.user.semester,
                    },
                }),
                client_1.prisma.report.findMany({
                    where: {
                        user: {
                            id: req.user.id,
                        },
                    },
                }),
            ]);
            const isTeacher = req.user.role === "TEACHER";
            if (isTeacher) {
                res.redirect("/quiz");
            }
            else {
                res.render("home/home", {
                    title: "home",
                    picture: req.user.picture,
                    quizzes: quizzes
                        .filter((quiz) => new Date() < new Date(quiz.endingDate))
                        .map((quiz) => (Object.assign(Object.assign({}, quiz), { examCompleted: !!reports.find((report) => report.quizId === quiz.id), isActive: new Date() >= new Date(quiz.startingDate), timeLimitInFormat: (0, parseTime_1.parseTime)(quiz.timeLimit * 60), startingDateInFormat: (0, parseDateAndTime_1.parseDateAndTime)(quiz.startingDate.toISOString()).trim(), endingDateInFormat: (0, parseDate_1.parseDate)(quiz.endingDate.toISOString()).trim() }))),
                });
            }
        });
    }
    static startQuiz(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!((_a = req.params) === null || _a === void 0 ? void 0 : _a.quizId)) {
                    return res.redirect("/home?_error=id was not provided");
                }
                // check whether user has already given the exam
                const report = yield client_1.prisma.report.findFirst({
                    where: {
                        user: {
                            id: req.user.id,
                        },
                        quiz: {
                            id: req.params.quizId,
                        },
                    },
                });
                if (report) {
                    return res.redirect("/home?_error=you can only give quiz once.");
                }
                const quiz = yield client_1.prisma.quiz.findFirst({
                    where: { id: req.params.quizId },
                    include: { Questions: true },
                });
                if (!quiz)
                    return res.redirect("/home?_error=quiz not available");
                const startingDateForQuiz = new Date(quiz.startingDate);
                const endingDateForQuiz = new Date(quiz.endingDate);
                const currentDate = new Date();
                if (currentDate < startingDateForQuiz) {
                    return res.redirect("/home");
                }
                if (currentDate > endingDateForQuiz) {
                    return res.redirect("/home");
                }
                res.render("home/take-quiz", {
                    layout: "main",
                    quiz,
                });
            }
            catch (err) {
                console.log("err in quiz controller", err);
                return res.redirect("/home?_error=something went wrong please try again later");
            }
        });
    }
    static showUserProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            res.render("home/profile", {
                user: {
                    name: user.name,
                    role: user.role,
                    email: user.email,
                    picture: user.picture,
                },
            });
        });
    }
    static generateReport(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userExamData = req.body;
                if (!userExamData.examId) {
                    console.log("no id found");
                    return;
                }
                const userAnswers = {};
                userExamData.userAnswers.forEach((userAnswer) => {
                    userAnswers[`${userAnswer.id}`] = userAnswer.userAnswer;
                });
                const quiz = yield client_1.prisma.quiz.findFirst({
                    where: { id: userExamData.examId },
                    include: { Questions: true },
                });
                if (!quiz) {
                    console.log("quiz not found");
                    return;
                }
                const questionsWithUserAnswers = [];
                let totalCorrectAnswers = 0;
                let totalIncorrectAnswers = 0;
                let notAnswered = 0;
                quiz.Questions.forEach((question) => {
                    questionsWithUserAnswers.push(Object.assign(Object.assign({}, question), { userAnswer: userAnswers[question.id] }));
                    if (userAnswers[question.id] === -1) {
                        notAnswered++;
                        return;
                    }
                    if (userAnswers[question.id] === question.correctAnswer) {
                        totalCorrectAnswers++;
                        return;
                    }
                    totalIncorrectAnswers++;
                    return;
                });
                const totalCorrectAnswersMarks = totalCorrectAnswers * quiz.marksPerQuestion;
                const totalIncorrectAnswersMarks = totalIncorrectAnswers * quiz.negativeMarksPerQuestion;
                const totalMarks = totalCorrectAnswersMarks - totalIncorrectAnswersMarks;
                const outOf = quiz.marksPerQuestion * quiz.Questions.length;
                const testCompletedInString = (0, parseTime_1.parseTime)(quiz.timeLimit * 60 - userExamData.totalTimeTakenByUser);
                const data = {
                    quizMarksDetails: {
                        totalCorrectAnswers,
                        totalIncorrectAnswers,
                        totalNotAnswered: notAnswered,
                        marksPerQuestion: quiz.marksPerQuestion,
                        negativeMarksPerQuestion: quiz.negativeMarksPerQuestion,
                        totalMarks,
                        outOf,
                        testCompletedInString,
                        testCompletedIn: quiz.timeLimit * 60 - userExamData.totalTimeTakenByUser,
                        totalQuestions: quiz.Questions.length,
                        timeLimit: quiz.timeLimit,
                    },
                    questions: questionsWithUserAnswers,
                };
                const report = yield client_1.prisma.report.create({
                    data: {
                        id: (0, nanoid_1.nanoid)(),
                        quizId: quiz.id,
                        userId: req.user.id,
                        score: `${totalMarks}/${outOf}`,
                        data: JSON.stringify(data),
                    },
                });
                if (!report) {
                    console.log("something went wrong while creating report");
                    return;
                }
                res.redirect("/home");
            }
            catch (err) {
                console.log(err, "err in Root controller");
            }
        });
    }
    static showAllReports(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reports = yield client_1.prisma.report.findMany({
                    where: {
                        user: {
                            id: req.user.id,
                        },
                    },
                    include: {
                        quiz: true,
                    },
                });
                if (!reports) {
                    console.log("no report found");
                }
                res.render("home/all-reports", {
                    reports: reports.map((report) => (Object.assign(Object.assign({}, report), { startingDateInFormat: (0, parseDate_1.parseDate)(report.quiz.startingDate.toISOString()), endingDateInFormat: (0, parseDate_1.parseDate)(report.quiz.endingDate.toISOString()), timeLimitInFormat: (0, parseTime_1.parseTime)(report.quiz.timeLimit * 60) }))),
                });
            }
            catch (err) {
                console.log(err, "root controller");
            }
        });
    }
    static showReport(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!((_a = req.params) === null || _a === void 0 ? void 0 : _a.reportId)) {
                    res.redirect("/home/reports");
                    return;
                }
                const report = yield client_1.prisma.report.findFirst({
                    where: { id: req.params.reportId },
                    include: {
                        quiz: true,
                    },
                });
                if (!report) {
                    res.redirect("/home/reports");
                    return;
                }
                res.render("home/report", {
                    report,
                    testSubmittedOn: (0, parseDate_1.parseDate)(report.createdAt.toISOString()),
                });
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    // : quizzes.filter((quiz) => new Date() > new Date(quiz.endingDate))
    // static async readQuiz(req: RequestWithUser, res: Response): Promise<void> {
    //   const response = await prisma.quiz.findMany({
    //     include: { Questions: { include: { options: true, subject: true } } },
    //   });
    //   console.log(response);
    //   res.render("home/all-quiz", {
    //     quizzes: response.map((quiz) => ({
    //       title: quiz.title,
    //       description: quiz.description,
    //       id: quiz.id,
    //       date: quiz.date,
    //       isActive: new Date(quiz.date) > new Date(),
    //     })),
    //   });
    // }
    static showAnnouncements(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const announcements = yield client_1.prisma.announcement.findMany({
                orderBy: { updatedAt: "desc" },
                include: {
                    user: {
                        select: {
                            name: true,
                        },
                    },
                },
            });
            res.render("home/announcements", {
                announcements: announcements.map((announcement) => (Object.assign(Object.assign({}, announcement), { createdAt: (0, parseDate_1.parseDate)(announcement.createdAt.toISOString()) }))),
            });
        });
    }
}
exports.Root = Root;
//# sourceMappingURL=Root.js.map