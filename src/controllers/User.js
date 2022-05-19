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
exports.DbUser = void 0;
var User_1 = require("../services/User");
var nanoid_1 = require("nanoid");
var client_1 = require("../config/client");
var parseDate_1 = require("../utils/parseDate");
var parseTime_1 = require("../utils/parseTime");
var DbUser = /** @class */ (function () {
    function DbUser() {
    }
    DbUser.allUsers = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, User_1.AuthUser.getAllUsers()];
                    case 1:
                        users = _a.sent();
                        if (!users) {
                            console.log("no user found");
                        }
                        res.render("users/all-users", {
                            users: users
                                .filter(function (user) { return user.email !== req.user.email; })
                                .map(function (user) { return (__assign(__assign({}, user), { isUserStudent: user.role === "STUDENT" })); })
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    DbUser.editUser = function (req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var user, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        if (!((_a = req.params) === null || _a === void 0 ? void 0 : _a.id))
                            return [2 /*return*/, res.redirect("/users")];
                        return [4 /*yield*/, client_1.prisma.user.findFirst({
                                where: { id: req.params.id }
                            })];
                    case 1:
                        user = _b.sent();
                        if (!user) {
                            return [2 /*return*/, res.redirect("/users")];
                        }
                        res.render("users/edit-user", {
                            user: user,
                            isEditingUserTeacher: user.role === "TEACHER"
                        });
                        return [2 /*return*/, null];
                    case 2:
                        err_1 = _b.sent();
                        console.log("err in user controlller", err_1);
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DbUser.editUserCallback = function (req, res) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function () {
            var newUser, err_2;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _f.trys.push([0, 2, , 3]);
                        if (!((_a = req.params) === null || _a === void 0 ? void 0 : _a.id))
                            return [2 /*return*/, res.redirect("/users")];
                        if (!((_b = req.body) === null || _b === void 0 ? void 0 : _b.email) ||
                            !((_c = req.body) === null || _c === void 0 ? void 0 : _c.name) ||
                            !((_d = req.body) === null || _d === void 0 ? void 0 : _d.semester) ||
                            !((_e = req.body) === null || _e === void 0 ? void 0 : _e.role)) {
                            return [2 /*return*/, res.render("users/edit-user", {
                                    error: "invalid data provided"
                                })];
                        }
                        return [4 /*yield*/, client_1.prisma.user.update({
                                where: { id: req.params.id },
                                data: {
                                    email: req.body.email,
                                    name: req.body.name,
                                    role: req.body.role,
                                    semester: parseInt(req.body.semester),
                                    updatedAt: new Date()
                                }
                            })];
                    case 1:
                        newUser = _f.sent();
                        if (!newUser)
                            return [2 /*return*/, res.render("users/edit-user", {
                                    error: "something went wrong"
                                })];
                        res.redirect("/users");
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _f.sent();
                        console.log("err inside user controller", err_2);
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DbUser.addUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                res.render("users/add-user");
                return [2 /*return*/];
            });
        });
    };
    DbUser.addUserCallback = function (req, res) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var user, currentUser, newUser, err_3;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        // const { email, name, year, semester, role } = req.body;
                        if (!((_a = req.body) === null || _a === void 0 ? void 0 : _a.email) ||
                            !((_b = req.body) === null || _b === void 0 ? void 0 : _b.name) ||
                            !((_c = req.body) === null || _c === void 0 ? void 0 : _c.semester) ||
                            !((_d = req.body) === null || _d === void 0 ? void 0 : _d.role)) {
                            return [2 /*return*/, res.render("users/add-user", {
                                    error: "invalid data provided"
                                })];
                        }
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, User_1.AuthUser.findUser(req.body.email)];
                    case 2:
                        user = _e.sent();
                        if (user) {
                            return [2 /*return*/, res.render("users/add-user", {
                                    error: "user already exists"
                                })];
                        }
                        currentUser = {
                            email: req.body.email,
                            name: req.body.name,
                            picture: "",
                            role: req.body.role,
                            year: parseInt(req.body.year)
                        };
                        return [4 /*yield*/, User_1.AuthUser.createUser({
                                email: req.body.email,
                                name: req.body.name,
                                picture: "",
                                role: req.body.role,
                                id: (0, nanoid_1.nanoid)(),
                                createdAt: new Date(),
                                updatedAt: new Date(),
                                semester: parseInt(req.body.semester)
                            })];
                    case 3:
                        newUser = _e.sent();
                        if (!newUser) {
                            return [2 /*return*/, res.render("users/add-user", {
                                    error: "something went wrong please try again later"
                                })];
                        }
                        res.redirect("/users");
                        return [3 /*break*/, 5];
                    case 4:
                        err_3 = _e.sent();
                        console.log("err in user controller", err_3);
                        res.render("users/add-user", {
                            error: "something went wrong"
                        });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    DbUser.deleteUser = function (req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!((_a = req.params) === null || _a === void 0 ? void 0 : _a.id))
                            return [2 /*return*/, res.redirect("/users")];
                        return [4 /*yield*/, User_1.AuthUser.deleteUser(req.params.id)];
                    case 1:
                        _b.sent();
                        res.redirect("/users");
                        return [2 /*return*/];
                }
            });
        });
    };
    DbUser.showUserReports = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var reports, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!req.params.userId) {
                            return [2 /*return*/, res.redirect("/users")];
                        }
                        return [4 /*yield*/, client_1.prisma.report.findMany({
                                where: {
                                    userId: req.params.userId
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
                        return [2 /*return*/, res.render("users/reports", {
                                reports: reports.map(function (report) { return (__assign(__assign({}, report), { startingDateInFormat: (0, parseDate_1.parseDate)(report.quiz.startingDate.toISOString()), endingDateInFormat: (0, parseDate_1.parseDate)(report.quiz.endingDate.toISOString()), timeLimitInFormat: (0, parseTime_1.parseTime)(report.quiz.timeLimit * 60) })); })
                            })];
                    case 2:
                        err_4 = _a.sent();
                        console.log(err_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return DbUser;
}());
exports.DbUser = DbUser;
