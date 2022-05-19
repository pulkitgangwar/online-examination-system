"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../controllers/User");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/", User_1.DbUser.allUsers);
router.get("/add", User_1.DbUser.addUser);
router.post("/add", User_1.DbUser.addUserCallback);
router.get("/edit/:id", User_1.DbUser.editUser);
router.post("/edit/:id", User_1.DbUser.editUserCallback);
router.get("/delete/:id", User_1.DbUser.deleteUser);
router.get("/report/user/:userId", User_1.DbUser.showUserReports);
exports.default = router;
//# sourceMappingURL=user.js.map