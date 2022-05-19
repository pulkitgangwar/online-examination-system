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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersGoogleData = exports.googleAuthUrl = exports.oauth2Client = void 0;
const googleapis_1 = require("googleapis");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.oauth2Client = new googleapis_1.google.auth.OAuth2({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUri: process.env.GOOGLE_CALLBACK_URL,
});
exports.googleAuthUrl = exports.oauth2Client.generateAuthUrl({
    scope: ["profile", "email"],
    access_type: "offline",
});
googleapis_1.google.options({ auth: exports.oauth2Client });
const getUsersGoogleData = (code) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tokens } = yield exports.oauth2Client.getToken(code);
        exports.oauth2Client.setCredentials(tokens);
        const data = googleapis_1.google.oauth2({
            version: "v2",
        });
        const userData = yield data.userinfo.get();
        return {
            email: userData.data.email,
            name: userData.data.name,
            id: userData.data.id,
            picture: userData.data.picture,
        };
    }
    catch (err) {
        console.log(err);
    }
});
exports.getUsersGoogleData = getUsersGoogleData;
//# sourceMappingURL=google.js.map