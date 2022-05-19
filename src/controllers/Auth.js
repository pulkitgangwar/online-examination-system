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
exports.Auth = void 0;
var google_1 = require("../strategy/google");
var client_1 = require("../config/client");
var helper_1 = require("../helpers/helper");
var getExpiryDate_1 = require("../utils/getExpiryDate");
var Auth = /** @class */ (function () {
    function Auth() {
    }
    Auth.signIn = function (req, res) {
        var information = {};
        if ("_success" in req.query) {
            information.success = req.query["_success"];
        }
        if ("_error" in req.query) {
            information.error = req.query["_error"];
        }
        res.render("auth/signin", { googleAuthUrl: google_1.googleAuthUrl, information: information, layout: "main" });
    };
    Auth.signInCallback = function (req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var code, userInfo, user, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        if (!((_a = req.query) === null || _a === void 0 ? void 0 : _a.code)) {
                            res.render("auth/signin", {
                                error: "something went wrong please try again later!!"
                            });
                            return [2 /*return*/];
                        }
                        code = req.query.code;
                        return [4 /*yield*/, (0, google_1.getUsersGoogleData)(code)];
                    case 1:
                        userInfo = _b.sent();
                        return [4 /*yield*/, (0, helper_1.createSession)(userInfo)];
                    case 2:
                        user = _b.sent();
                        if (user.error) {
                            res.redirect("/auth/google?_error=".concat(user.error));
                            return [2 /*return*/];
                        }
                        if (!user.session && user.error) {
                            res.redirect("/auth/google?_error=".concat(user.error));
                            return [2 /*return*/];
                        }
                        res.cookie("sid", user.session.id, {
                            signed: true,
                            httpOnly: true,
                            expires: (0, getExpiryDate_1.getExpiryDate)()
                        });
                        res.redirect("/home");
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _b.sent();
                        console.log(err_1);
                        console.log(err_1.message, "inside error block bro!");
                        res.redirect("/auth/google?_error=something went wrong please try again later");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Auth.logOut = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var sid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sid = req.signedCookies.sid;
                        return [4 /*yield*/, client_1.prisma.session["delete"]({ where: { id: sid } })];
                    case 1:
                        _a.sent();
                        res.clearCookie("sid", {
                            httpOnly: true,
                            signed: true
                        });
                        res.redirect("/auth/google");
                        return [2 /*return*/];
                }
            });
        });
    };
    return Auth;
}());
exports.Auth = Auth;
