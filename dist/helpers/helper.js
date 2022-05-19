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
exports.createSession = void 0;
const User_1 = require("../services/User");
const Session_1 = require("../services/Session");
const createSession = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //   find user exists
        const currentUser = yield User_1.AuthUser.findUser(user.email);
        if (!currentUser) {
            return { error: "no user found", data: null, session: null };
        }
        // create session for user
        const session = yield Session_1.AuthSession.createSession(currentUser);
        if (!session) {
            return {
                error: "problem in creating a new session",
                data: currentUser,
                session: null,
            };
        }
        return { error: null, data: currentUser, session };
    }
    catch (err) {
        console.log("inside createsession helper ", err);
        return {
            error: "something went wrong please try after sometime",
            data: null,
            session: null,
        };
    }
});
exports.createSession = createSession;
//# sourceMappingURL=helper.js.map