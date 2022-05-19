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
exports.AuthSession = void 0;
const client_1 = require("../config/client");
const nanoid_1 = require("nanoid");
const getExpiryDate_1 = require("../utils/getExpiryDate");
class AuthSession {
    static findSession(sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const session = yield client_1.prisma.session.findFirst({
                    where: { id: sessionId },
                    include: {
                        user: true,
                    },
                });
                if (!session) {
                    return null;
                }
                return session;
            }
            catch (err) {
                console.log("err in auth session services", err);
                return null;
            }
        });
    }
    static createSession(userInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newSession = yield client_1.prisma.session.create({
                    data: {
                        id: (0, nanoid_1.nanoid)(),
                        userId: userInfo.id,
                        expiresAt: (0, getExpiryDate_1.getExpiryDate)(),
                    },
                });
                if (!newSession)
                    return null;
                return newSession;
            }
            catch (err) {
                console.log("inside session services ", err);
                return null;
            }
        });
    }
    static deleteSession(sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedSession = yield client_1.prisma.session.delete({
                    where: { id: sessionId },
                });
            }
            catch (err) {
                console.log("err in auth session services", err);
                return null;
            }
        });
    }
}
exports.AuthSession = AuthSession;
//# sourceMappingURL=Session.js.map