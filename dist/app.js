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
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = require("dotenv");
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const authenticate_1 = require("./middlewares/authenticate");
const express_handlebars_1 = require("express-handlebars");
// routes
const auth_1 = __importDefault(require("./routes/auth"));
const root_1 = __importDefault(require("./routes/root"));
const dashboard_1 = __importDefault(require("./routes/dashboard"));
const user_1 = __importDefault(require("./routes/user"));
const quiz_1 = __importDefault(require("./routes/quiz"));
const announcement_1 = __importDefault(require("./routes/announcement"));
const authorizeUser_1 = require("./middlewares/authorizeUser");
const app = (0, express_1.default)();
// env config
(0, dotenv_1.config)();
// body parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// cookieparser
app.use((0, cookie_parser_1.default)(process.env.SESSION_SECRET));
// initializing view engine
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
app.engine("handlebars", (0, express_handlebars_1.engine)({
    defaultLayout: "sidebar",
    helpers: {
        json: (ctx) => JSON.stringify(ctx),
    },
}));
app.set("view engine", "handlebars");
app.set("views", "./src/views");
// morgan config
app.use((0, morgan_1.default)("dev"));
// routes
app.get("/", (req, res) => {
    res.redirect("/home");
});
app.use("/auth", auth_1.default);
app.use("/home", authenticate_1.authenticate, root_1.default);
app.use("/dashboard", authenticate_1.authenticate, authorizeUser_1.authorizeUser, dashboard_1.default);
app.use("/users", authenticate_1.authenticate, authorizeUser_1.authorizeUser, user_1.default);
app.use("/quiz", authenticate_1.authenticate, authorizeUser_1.authorizeUser, quiz_1.default);
app.use("/announcement", authenticate_1.authenticate, authorizeUser_1.authorizeUser, announcement_1.default);
app.use((req, res) => {
    res.status(404).render("404", { layout: "main" });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`server running on port ${PORT}`);
}));
//# sourceMappingURL=app.js.map