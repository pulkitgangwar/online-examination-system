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
exports.createUserAndSession = exports.createUserSession = exports.createUser = exports.checkUserExists = exports.getSession = exports.getUser = void 0;
const client_1 = require("../config/client");
const getUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield client_1.prisma.user.findFirst({ where: { id } });
        if (!user)
            return null;
        return user;
    }
    catch (err) {
        console.log(err);
        return null;
    }
});
exports.getUser = getUser;
const getSession = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const session = yield client_1.prisma.session.findFirst({ where: { id } });
        if (!session)
            return null;
        return session;
    }
    catch (err) {
        console.log(err);
        return null;
    }
});
exports.getSession = getSession;
const checkUserExists = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield client_1.prisma.user.findFirst({ where: { id: id } });
        if (!user) {
            return null;
        }
        return user;
    }
    catch (err) {
        return null;
    }
});
exports.checkUserExists = checkUserExists;
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentUser = yield (0, exports.checkUserExists)(user.id);
        if (currentUser) {
            return currentUser;
        }
        const newUser = yield client_1.prisma.user.create({
            data: {
                email: user.email,
                name: user.name,
                picture: user.picture,
            },
        });
        return newUser;
    }
    catch (err) {
        console.log(err, "createuser function");
        return null;
    }
});
exports.createUser = createUser;
const createUserSession = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newSession = yield client_1.prisma.session.create({
            data: {
                userId: user.id,
                expiresAt: new Date(Date.now() + 86400 * 1000 * 7),
            },
        });
        return newSession;
    }
    catch (err) {
        console.log(err, "create user session");
        return null;
    }
});
exports.createUserSession = createUserSession;
const createUserAndSession = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentUser = yield (0, exports.createUser)(user);
        if (!currentUser) {
            return null;
        }
        const session = yield (0, exports.createUserSession)(currentUser);
        return session;
    }
    catch (err) {
        console.log(err, "createuserandsession function");
        return null;
    }
});
exports.createUserAndSession = createUserAndSession;
//# sourceMappingURL=helpers.js.map