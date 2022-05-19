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
exports.authenticate = void 0;
const Session_1 = require("../services/Session");
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (!((_a = req.signedCookies) === null || _a === void 0 ? void 0 : _a.sid)) {
            res.redirect("/auth/google");
            return;
        }
        const session = yield Session_1.AuthSession.findSession(req.signedCookies.sid);
        // check session exists or not
        if (!session) {
            res.redirect("/auth/google");
            return;
        }
        // check expiry
        if (session.expiresAt <= new Date()) {
            yield Session_1.AuthSession.deleteSession(req.signedCookies.sid);
            res.clearCookie("sid", {
                httpOnly: true,
                signed: true,
            });
            res.redirect("/auth/google");
            return;
        }
        res.locals.isTeacher = session.user.role === "TEACHER";
        res.locals.isBackButtonAvailable =
            req.originalUrl.split("/").filter((url) => url).length >= 2;
        req.user = session.user;
        next();
    }
    catch (err) {
        console.log(err, "err in middleware");
    }
});
exports.authenticate = authenticate;
//# sourceMappingURL=authenticate.js.map