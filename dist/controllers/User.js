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
exports.DbUser = void 0;
const User_1 = require("../services/User");
const nanoid_1 = require("nanoid");
const client_1 = require("../config/client");
const parseDate_1 = require("../utils/parseDate");
const parseTime_1 = require("../utils/parseTime");
class DbUser {
    static allUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield User_1.AuthUser.getAllUsers();
            if (!users) {
                console.log("no user found");
            }
            res.render("users/all-users", {
                users: users
                    .filter((user) => user.email !== req.user.email)
                    .map((user) => (Object.assign(Object.assign({}, user), { isUserStudent: user.role === "STUDENT" }))),
            });
        });
    }
    static editUser(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!((_a = req.params) === null || _a === void 0 ? void 0 : _a.id))
                    return res.redirect("/users");
                const user = yield client_1.prisma.user.findFirst({
                    where: { id: req.params.id },
                });
                if (!user) {
                    return res.redirect("/users");
                }
                res.render("users/edit-user", {
                    user,
                    isEditingUserTeacher: user.role === "TEACHER",
                });
                return null;
            }
            catch (err) {
                console.log("err in user controlller", err);
                return null;
            }
        });
    }
    static editUserCallback(req, res) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!((_a = req.params) === null || _a === void 0 ? void 0 : _a.id))
                    return res.redirect("/users");
                if (!((_b = req.body) === null || _b === void 0 ? void 0 : _b.email) ||
                    !((_c = req.body) === null || _c === void 0 ? void 0 : _c.name) ||
                    !((_d = req.body) === null || _d === void 0 ? void 0 : _d.semester) ||
                    !((_e = req.body) === null || _e === void 0 ? void 0 : _e.role)) {
                    return res.render("users/edit-user", {
                        error: "invalid data provided",
                    });
                }
                const newUser = yield client_1.prisma.user.update({
                    where: { id: req.params.id },
                    data: {
                        email: req.body.email,
                        name: req.body.name,
                        role: req.body.role,
                        semester: parseInt(req.body.semester),
                        updatedAt: new Date(),
                    },
                });
                if (!newUser)
                    return res.render("users/edit-user", {
                        error: "something went wrong",
                    });
                res.redirect("/users");
            }
            catch (err) {
                console.log("err inside user controller", err);
                return null;
            }
        });
    }
    static addUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.render("users/add-user");
        });
    }
    static addUserCallback(req, res) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            // const { email, name, year, semester, role } = req.body;
            if (!((_a = req.body) === null || _a === void 0 ? void 0 : _a.email) ||
                !((_b = req.body) === null || _b === void 0 ? void 0 : _b.name) ||
                !((_c = req.body) === null || _c === void 0 ? void 0 : _c.semester) ||
                !((_d = req.body) === null || _d === void 0 ? void 0 : _d.role)) {
                return res.render("users/add-user", {
                    error: "invalid data provided",
                });
            }
            try {
                const user = yield User_1.AuthUser.findUser(req.body.email);
                if (user) {
                    return res.render("users/add-user", {
                        error: "user already exists",
                    });
                }
                const currentUser = {
                    email: req.body.email,
                    name: req.body.name,
                    picture: "",
                    role: req.body.role,
                    year: parseInt(req.body.year),
                };
                const newUser = yield User_1.AuthUser.createUser({
                    email: req.body.email,
                    name: req.body.name,
                    picture: "",
                    role: req.body.role,
                    id: (0, nanoid_1.nanoid)(),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    semester: parseInt(req.body.semester),
                });
                if (!newUser) {
                    return res.render("users/add-user", {
                        error: "something went wrong please try again later",
                    });
                }
                res.redirect("/users");
            }
            catch (err) {
                console.log("err in user controller", err);
                res.render("users/add-user", {
                    error: "something went wrong",
                });
            }
        });
    }
    static deleteUser(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!((_a = req.params) === null || _a === void 0 ? void 0 : _a.id))
                return res.redirect("/users");
            yield User_1.AuthUser.deleteUser(req.params.id);
            res.redirect("/users");
        });
    }
    static showUserReports(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.params.userId) {
                    return res.redirect("/users");
                }
                const reports = yield client_1.prisma.report.findMany({
                    where: {
                        userId: req.params.userId,
                    },
                    include: {
                        quiz: true,
                    },
                });
                if (!reports) {
                    console.log("no report found");
                }
                return res.render("users/reports", {
                    reports: reports.map((report) => (Object.assign(Object.assign({}, report), { startingDateInFormat: (0, parseDate_1.parseDate)(report.quiz.startingDate.toISOString()), endingDateInFormat: (0, parseDate_1.parseDate)(report.quiz.endingDate.toISOString()), timeLimitInFormat: (0, parseTime_1.parseTime)(report.quiz.timeLimit * 60) }))),
                });
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
exports.DbUser = DbUser;
//# sourceMappingURL=User.js.map