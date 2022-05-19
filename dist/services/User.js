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
exports.AuthUser = void 0;
const client_1 = require("../config/client");
class AuthUser {
    static createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = yield client_1.prisma.user.create({
                    data: {
                        email: user.email,
                        name: user.name,
                        picture: "",
                        role: user.role,
                        semester: user.semester,
                    },
                });
                return newUser;
            }
            catch (err) {
                console.log("err in user service", err);
                return null;
            }
        });
    }
    static getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield client_1.prisma.user.findMany();
                if (!users) {
                    return null;
                }
                return users;
            }
            catch (err) {
                console.log("err in error in db user controller", err);
                return null;
            }
        });
    }
    static findUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield client_1.prisma.user.findFirst({ where: { email } });
                if (!user)
                    return null;
                return user;
            }
            catch (err) {
                console.log("inside AuthUser service", err);
                return null;
            }
        });
    }
    static deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield client_1.prisma.user.delete({ where: { id: userId } });
                return true;
            }
            catch (err) {
                console.log("err in user services", err);
                return null;
            }
        });
    }
}
exports.AuthUser = AuthUser;
//# sourceMappingURL=User.js.map