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
var express_1 = require("express");
var path_1 = require("path");
var dotenv_1 = require("dotenv");
var morgan_1 = require("morgan");
var cookie_parser_1 = require("cookie-parser");
var authenticate_1 = require("./middlewares/authenticate");
var express_handlebars_1 = require("express-handlebars");
// routes
var auth_1 = require("./routes/auth");
var root_1 = require("./routes/root");
var dashboard_1 = require("./routes/dashboard");
var user_1 = require("./routes/user");
var quiz_1 = require("./routes/quiz");
var announcement_1 = require("./routes/announcement");
var authorizeUser_1 = require("./middlewares/authorizeUser");
var app = (0, express_1["default"])();
// env config
(0, dotenv_1.config)();
// body parser
app.use(express_1["default"].json());
app.use(express_1["default"].urlencoded({ extended: false }));
// cookieparser
app.use((0, cookie_parser_1["default"])(process.env.SESSION_SECRET));
// initializing view engine
app.use(express_1["default"].static(path_1["default"].join(__dirname, "../public")));
app.engine("handlebars", (0, express_handlebars_1.engine)({
    defaultLayout: "sidebar",
    helpers: {
        json: function (ctx) { return JSON.stringify(ctx); }
    }
}));
app.set("view engine", "handlebars");
app.set("views", "./src/views");
// morgan config
app.use((0, morgan_1["default"])("dev"));
// routes
app.get("/", function (req, res) {
    res.redirect("/home");
});
app.use("/auth", auth_1["default"]);
app.use("/home", authenticate_1.authenticate, root_1["default"]);
app.use("/dashboard", authenticate_1.authenticate, authorizeUser_1.authorizeUser, dashboard_1["default"]);
app.use("/users", authenticate_1.authenticate, authorizeUser_1.authorizeUser, user_1["default"]);
app.use("/quiz", authenticate_1.authenticate, authorizeUser_1.authorizeUser, quiz_1["default"]);
app.use("/announcement", authenticate_1.authenticate, authorizeUser_1.authorizeUser, announcement_1["default"]);
app.use(function (req, res) {
    res.status(404).render("404", { layout: "main" });
});
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log("server running on port ".concat(PORT));
        return [2 /*return*/];
    });
}); });
