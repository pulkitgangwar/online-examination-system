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
exports.Quiz = void 0;
var nanoid_1 = require("nanoid");
var client_1 = require("../config/client");
var parseTime_1 = require("../utils/parseTime");
var parseDate_1 = require("../utils/parseDate");
var parseDateAndTime_1 = require("../utils/parseDateAndTime");
var Quiz = /** @class */ (function () {
    function Quiz() {
    }
    Quiz.allQuiz = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var quizzes, information;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, client_1.prisma.quiz.findMany({
                            orderBy: { createdAt: "desc" },
                            include: {
                                User: {
                                    select: {
                                        id: true,
                                        name: true
                                    }
                                }
                            }
                        })];
                    case 1:
                        quizzes = _a.sent();
                        information = {};
                        if ("_success" in req.query) {
                            information.success = req.query["_success"];
                        }
                        if ("_error" in req.query) {
                            information.error = req.query["_error"];
                        }
                        res.render("quiz/all-quiz", {
                            quizzes: quizzes
                                .filter(function (quiz) { return new Date() <= new Date(quiz.endingDate); })
                                .map(function (quiz) { return (__assign(__assign({}, quiz), { isEditable: quiz.userId === req.user.id, isActive: new Date() >= new Date(quiz.startingDate), timeLimitInFormat: (0, parseTime_1.parseTime)(quiz.timeLimit * 60), startingDateInFormat: (0, parseDateAndTime_1.parseDateAndTime)(quiz.startingDate.toISOString()).trim(), endingDateInFormat: (0, parseDate_1.parseDate)(quiz.endingDate.toISOString()).trim() })); }),
                            information: information
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    Quiz.addQuiz = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                res.render("quiz/add-quiz", {
                    route: "showaddquiz route"
                });
                return [2 /*return*/];
            });
        });
    };
    Quiz.addQuizCallback = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var quiz, newQuiz, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        quiz = req.body;
                        return [4 /*yield*/, client_1.prisma.quiz.create({
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
                                        create: quiz.questions.map(function (question) { return ({
                                            id: (0, nanoid_1.nanoid)(),
                                            question: question.question,
                                            correctAnswer: question.correctAnswerIndex,
                                            options: question.options
                                        }); })
                                    }
                                }
                            })];
                    case 1:
                        newQuiz = _a.sent();
                        if (!newQuiz)
                            res.status(400).render("quiz/add-quiz", {
                                error: "Something went wrong please try again later"
                            });
                        res.redirect("/quiz");
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        console.log(err_1);
                        res.render("quiz/add-quiz", { error: err_1.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Quiz.editQuiz = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var quizId, quiz;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        quizId = req.params.quizId;
                        return [4 /*yield*/, client_1.prisma.quiz.findFirst({
                                where: { id: quizId },
                                include: { Questions: true }
                            })];
                    case 1:
                        quiz = _a.sent();
                        if (!quiz) {
                            return [2 /*return*/, res.redirect("/quiz")];
                        }
                        res.render("quiz/edit-quiz", {
                            id: quizId,
                            error: "",
                            quiz: quiz,
                            startingDate: new Date(quiz.startingDate).toISOString().split(".")[0],
                            endingDate: new Date(quiz.endingDate).toISOString().split(".")[0]
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    Quiz.editQuizCallback = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var quiz;
            return __generator(this, function (_a) {
                try {
                    quiz = req.body;
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
                return [2 /*return*/];
            });
        });
    };
    Quiz.deleteQuiz = function (req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!((_a = req.params) === null || _a === void 0 ? void 0 : _a.quizId))
                            return [2 /*return*/, res.redirect("/quiz?_error='id not provided'")];
                        return [4 /*yield*/, client_1.prisma.quiz["delete"]({ where: { id: req.params.quizId } })];
                    case 1:
                        _b.sent();
                        res.redirect("/quiz?_success='quiz deleted successfully'");
                        return [2 /*return*/];
                }
            });
        });
    };
    return Quiz;
}());
exports.Quiz = Quiz;
