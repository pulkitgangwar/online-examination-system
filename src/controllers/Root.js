"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.Root = void 0;
var client_1 = require("../config/client");
var parseTime_1 = require("../utils/parseTime");
var parseDate_1 = require("../utils/parseDate");
var nanoid_1 = require("nanoid");
var parseDateAndTime_1 = require("../utils/parseDateAndTime");
var Root = /** @class */ (function () {
    function Root() {
    }
    Root.home = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, quizzes, reports, isTeacher;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Promise.all([
                            client_1.prisma.quiz.findMany({
                                where: {
                                    semester: req.user.semester
                                }
                            }),
                            client_1.prisma.report.findMany({
                                where: {
                                    user: {
                                        id: req.user.id
                                    }
                                }
                            }),
                        ])];
                    case 1:
                        _a = _b.sent(), quizzes = _a[0], reports = _a[1];
                        isTeacher = req.user.role === "TEACHER";
                        if (isTeacher) {
                            res.redirect("/quiz");
                        }
                        else {
                            res.render("home/home", {
                                title: "home",
                                picture: req.user.picture,
                                quizzes: quizzes
                                    .filter(function (quiz) { return new Date() < new Date(quiz.endingDate); })
                                    .map(function (quiz) { return (__assign(__assign({}, quiz), { examCompleted: !!reports.find(function (report) { return report.quizId === quiz.id; }), isActive: new Date() >= new Date(quiz.startingDate), timeLimitInFormat: (0, parseTime_1.parseTime)(quiz.timeLimit * 60), startingDateInFormat: (0, parseDateAndTime_1.parseDateAndTime)(quiz.startingDate.toISOString()).trim(), endingDateInFormat: (0, parseDate_1.parseDate)(quiz.endingDate.toISOString()).trim() })); })
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Root.startQuiz = function (req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var report, quiz, startingDateForQuiz, endingDateForQuiz, currentDate, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        if (!((_a = req.params) === null || _a === void 0 ? void 0 : _a.quizId)) {
                            return [2 /*return*/, res.redirect("/home?_error=id was not provided")];
                        }
                        return [4 /*yield*/, client_1.prisma.report.findFirst({
                                where: {
                                    user: {
                                        id: req.user.id
                                    },
                                    quiz: {
                                        id: req.params.quizId
                                    }
                                }
                            })];
                    case 1:
                        report = _b.sent();
                        if (report) {
                            return [2 /*return*/, res.redirect("/home?_error=you can only give quiz once.")];
                        }
                        return [4 /*yield*/, client_1.prisma.quiz.findFirst({
                                where: { id: req.params.quizId },
                                include: { Questions: true }
                            })];
                    case 2:
                        quiz = _b.sent();
                        if (!quiz)
                            return [2 /*return*/, res.redirect("/home?_error=quiz not available")];
                        startingDateForQuiz = new Date(quiz.startingDate);
                        endingDateForQuiz = new Date(quiz.endingDate);
                        currentDate = new Date();
                        if (currentDate < startingDateForQuiz) {
                            return [2 /*return*/, res.redirect("/home")];
                        }
                        if (currentDate > endingDateForQuiz) {
                            return [2 /*return*/, res.redirect("/home")];
                        }
                        res.render("home/take-quiz", {
                            layout: "main",
                            quiz: quiz
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _b.sent();
                        console.log("err in quiz controller", err_1);
                        return [2 /*return*/, res.redirect("/home?_error=something went wrong please try again later")];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Root.showUserProfile = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                user = req.user;
                res.render("home/profile", {
                    user: {
                        name: user.name,
                        role: user.role,
                        email: user.email,
                        picture: user.picture
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    Root.generateReport = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userExamData, userAnswers_1, quiz, questionsWithUserAnswers_1, totalCorrectAnswers_1, totalIncorrectAnswers_1, notAnswered_1, totalCorrectAnswersMarks, totalIncorrectAnswersMarks, totalMarks, outOf, testCompletedInString, data, report, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        userExamData = req.body;
                        if (!userExamData.examId) {
                            console.log("no id found");
                            return [2 /*return*/];
                        }
                        userAnswers_1 = {};
                        userExamData.userAnswers.forEach(function (userAnswer) {
                            userAnswers_1["".concat(userAnswer.id)] = userAnswer.userAnswer;
                        });
                        return [4 /*yield*/, client_1.prisma.quiz.findFirst({
                                where: { id: userExamData.examId },
                                include: { Questions: true }
                            })];
                    case 1:
                        quiz = _a.sent();
                        if (!quiz) {
                            console.log("quiz not found");
                            return [2 /*return*/];
                        }
                        questionsWithUserAnswers_1 = [];
                        totalCorrectAnswers_1 = 0;
                        totalIncorrectAnswers_1 = 0;
                        notAnswered_1 = 0;
                        quiz.Questions.forEach(function (question) {
                            questionsWithUserAnswers_1.push(__assign(__assign({}, question), { userAnswer: userAnswers_1[question.id] }));
                            if (userAnswers_1[question.id] === -1) {
                                notAnswered_1++;
                                return;
                            }
                            if (userAnswers_1[question.id] === question.correctAnswer) {
                                totalCorrectAnswers_1++;
                                return;
                            }
                            totalIncorrectAnswers_1++;
                            return;
                        });
                        totalCorrectAnswersMarks = totalCorrectAnswers_1 * quiz.marksPerQuestion;
                        totalIncorrectAnswersMarks = totalIncorrectAnswers_1 * quiz.negativeMarksPerQuestion;
                        totalMarks = totalCorrectAnswersMarks - totalIncorrectAnswersMarks;
                        outOf = quiz.marksPerQuestion * quiz.Questions.length;
                        testCompletedInString = (0, parseTime_1.parseTime)(quiz.timeLimit * 60 - userExamData.totalTimeTakenByUser);
                        data = {
                            quizMarksDetails: {
                                totalCorrectAnswers: totalCorrectAnswers_1,
                                totalIncorrectAnswers: totalIncorrectAnswers_1,
                                totalNotAnswered: notAnswered_1,
                                marksPerQuestion: quiz.marksPerQuestion,
                                negativeMarksPerQuestion: quiz.negativeMarksPerQuestion,
                                totalMarks: totalMarks,
                                outOf: outOf,
                                testCompletedInString: testCompletedInString,
                                testCompletedIn: quiz.timeLimit * 60 - userExamData.totalTimeTakenByUser,
                                totalQuestions: quiz.Questions.length,
                                timeLimit: quiz.timeLimit
                            },
                            questions: questionsWithUserAnswers_1
                        };
                        return [4 /*yield*/, client_1.prisma.report.create({
                                data: {
                                    id: (0, nanoid_1.nanoid)(),
                                    quizId: quiz.id,
                                    userId: req.user.id,
                                    score: "".concat(totalMarks, "/").concat(outOf),
                                    data: JSON.stringify(data)
                                }
                            })];
                    case 2:
                        report = _a.sent();
                        if (!report) {
                            console.log("something went wrong while creating report");
                            return [2 /*return*/];
                        }
                        res.redirect("/home");
                        return [3 /*break*/, 4];
                    case 3:
                        err_2 = _a.sent();
                        console.log(err_2, "err in Root controller");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Root.showAllReports = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var reports, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, client_1.prisma.report.findMany({
                                where: {
                                    user: {
                                        id: req.user.id
                                    }
                                },
                                include: {
                                    quiz: true
                                }
                            })];
                    case 1:
                        reports = _a.sent();
                        if (!reports) {
                            console.log("no report found");
                        }
                        res.render("home/all-reports", {
                            reports: reports.map(function (report) { return (__assign(__assign({}, report), { startingDateInFormat: (0, parseDate_1.parseDate)(report.quiz.startingDate.toISOString()), endingDateInFormat: (0, parseDate_1.parseDate)(report.quiz.endingDate.toISOString()), timeLimitInFormat: (0, parseTime_1.parseTime)(report.quiz.timeLimit * 60) })); })
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        err_3 = _a.sent();
                        console.log(err_3, "root controller");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Root.showReport = function (req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var report, err_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        if (!((_a = req.params) === null || _a === void 0 ? void 0 : _a.reportId)) {
                            res.redirect("/home/reports");
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, client_1.prisma.report.findFirst({
                                where: { id: req.params.reportId },
                                include: {
                                    quiz: true
                                }
                            })];
                    case 1:
                        report = _b.sent();
                        if (!report) {
                            res.redirect("/home/reports");
                            return [2 /*return*/];
                        }
                        res.render("home/report", {
                            report: report,
                            testSubmittedOn: (0, parseDate_1.parseDate)(report.createdAt.toISOString())
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        err_4 = _b.sent();
                        console.log(err_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
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
    Root.showAnnouncements = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var announcements;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, client_1.prisma.announcement.findMany({
                            orderBy: { updatedAt: "desc" },
                            include: {
                                user: {
                                    select: {
                                        name: true
                                    }
                                }
                            }
                        })];
                    case 1:
                        announcements = _a.sent();
                        res.render("home/announcements", {
                            announcements: announcements.map(function (announcement) { return (__assign(__assign({}, announcement), { createdAt: (0, parseDate_1.parseDate)(announcement.createdAt.toISOString()) })); })
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    return Root;
}());
exports.Root = Root;
