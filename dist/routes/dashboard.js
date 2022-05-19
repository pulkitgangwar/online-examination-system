"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Dashboard_1 = require("../controllers/Dashboard");
const router = (0, express_1.Router)();
router.get("/", Dashboard_1.Dashboard.home);
exports.default = router;
//# sourceMappingURL=dashboard.js.map