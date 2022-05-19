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
exports.Auth = void 0;
const google_1 = require("../strategy/google");
const client_1 = require("../config/client");
const helper_1 = require("../helpers/helper");
const getExpiryDate_1 = require("../utils/getExpiryDate");
class Auth {
    static signIn(req, res) {
        const information = {};
        if ("_success" in req.query) {
            information.success = req.query["_success"];
        }
        if ("_error" in req.query) {
            information.error = req.query["_error"];
        }
        res.render("auth/signin", { googleAuthUrl: google_1.googleAuthUrl, information, layout: "main" });
    }
    static signInCallback(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!((_a = req.query) === null || _a === void 0 ? void 0 : _a.code)) {
                    res.render("auth/signin", {
                        error: "something went wrong please try again later!!",
                    });
                    return;
                }
                const code = req.query.code;
                const userInfo = yield (0, google_1.getUsersGoogleData)(code);
                const user = yield (0, helper_1.createSession)(userInfo);
                if (user.error) {
                    res.redirect(`/auth/google?_error=${user.error}`);
                    return;
                }
                if (!user.session && user.error) {
                    res.redirect(`/auth/google?_error=${user.error}`);
                    return;
                }
                res.cookie("sid", user.session.id, {
                    signed: true,
                    httpOnly: true,
                    expires: (0, getExpiryDate_1.getExpiryDate)(),
                });
                res.redirect("/home");
            }
            catch (err) {
                console.log(err);
                console.log(err.message, "inside error block bro!");
                res.redirect(`/auth/google?_error=something went wrong please try again later`);
            }
        });
    }
    static logOut(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sid = req.signedCookies.sid;
            yield client_1.prisma.session.delete({ where: { id: sid } });
            res.clearCookie("sid", {
                httpOnly: true,
                signed: true,
            });
            res.redirect("/auth/google");
        });
    }
}
exports.Auth = Auth;
//# sourceMappingURL=Auth.js.map