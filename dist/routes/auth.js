"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Auth_1 = require("../controllers/Auth");
const router = (0, express_1.Router)();
router.get("/google", Auth_1.Auth.signIn);
router.get("/google/callback", Auth_1.Auth.signInCallback);
router.get("/logout", Auth_1.Auth.logOut);
exports.default = router;
//# sourceMappingURL=auth.js.map