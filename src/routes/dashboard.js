"use strict";
exports.__esModule = true;
var express_1 = require("express");
var Dashboard_1 = require("../controllers/Dashboard");
var router = (0, express_1.Router)();
router.get("/", Dashboard_1.Dashboard.home);
exports["default"] = router;
