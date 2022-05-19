"use strict";
exports.__esModule = true;
var express_1 = require("express");
var Auth_1 = require("../controllers/Auth");
var router = (0, express_1.Router)();
router.get("/google", Auth_1.Auth.signIn);
router.get("/google/callback", Auth_1.Auth.signInCallback);
router.get("/logout", Auth_1.Auth.logOut);
exports["default"] = router;
