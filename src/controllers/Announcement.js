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
exports.Announcement = void 0;
var client_1 = require("../config/client");
var parseDate_1 = require("../utils/parseDate");
var Announcement = /** @class */ (function () {
    function Announcement() {
    }
    Announcement.showAllAnnoucements = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var announcements, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, client_1.prisma.announcement.findMany({
                                orderBy: { updatedAt: "desc" },
                                include: {
                                    user: {
                                        select: {
                                            name: true,
                                            id: true
                                        }
                                    }
                                }
                            })];
                    case 1:
                        announcements = _a.sent();
                        res.render("announcement/announcements", {
                            announcements: announcements.map(function (announcement) { return (__assign(__assign({}, announcement), { isEditable: announcement.user.id === req.user.id, createdAt: (0, parseDate_1.parseDate)(announcement.createdAt.toISOString()) })); })
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        console.log(err_1, "err in ann controller");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Announcement.addAnnouncement = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                res.render("announcement/add");
                return [2 /*return*/];
            });
        });
    };
    Announcement.addAnnouncementCallback = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var description, announcement, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        description = req.body.description;
                        if (!description) {
                            return [2 /*return*/, res.render("announcement/add", {
                                    error: "please provide announcement"
                                })];
                        }
                        return [4 /*yield*/, client_1.prisma.announcement.create({
                                data: {
                                    description: description,
                                    userId: req.user.id
                                }
                            })];
                    case 1:
                        announcement = _a.sent();
                        if (!announcement) {
                            return [2 /*return*/, res.render("announcement/add", {
                                    error: "something went wrong please try again later"
                                })];
                        }
                        res.redirect("/announcement");
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        console.log(err_2, "error in announcement controller");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Announcement.editAnnouncement = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var announcement;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!req.params.announcementId) {
                            return [2 /*return*/, res.redirect("/announcement")];
                        }
                        return [4 /*yield*/, client_1.prisma.announcement.findFirst({
                                where: { id: req.params.announcementId }
                            })];
                    case 1:
                        announcement = _a.sent();
                        if (!announcement) {
                            return [2 /*return*/, res.redirect("/announcement")];
                        }
                        res.render("announcement/edit", {
                            description: announcement.description,
                            id: announcement.id
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    Announcement.editAnnouncementCallback = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, description, id, announcement, err_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, description = _a.description, id = _a.id;
                        if (!description || !id)
                            return [2 /*return*/, res.redirect("/announcement")];
                        return [4 /*yield*/, client_1.prisma.announcement.update({
                                where: {
                                    id: id
                                },
                                data: {
                                    description: description,
                                    updatedAt: new Date()
                                }
                            })];
                    case 1:
                        announcement = _b.sent();
                        res.redirect("/announcement");
                        return [3 /*break*/, 3];
                    case 2:
                        err_3 = _b.sent();
                        console.log(err_3, "err in ann controller");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Announcement.deleteAnnouncement = function (req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!((_a = req.params) === null || _a === void 0 ? void 0 : _a.announcementId))
                            return [2 /*return*/, res.redirect("/announcement")];
                        return [4 /*yield*/, client_1.prisma.announcement["delete"]({
                                where: { id: req.params.announcementId }
                            })];
                    case 1:
                        _b.sent();
                        res.redirect("/announcement");
                        return [2 /*return*/];
                }
            });
        });
    };
    return Announcement;
}());
exports.Announcement = Announcement;
