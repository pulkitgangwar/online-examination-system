"use strict";
exports.__esModule = true;
exports.Dashboard = void 0;
var Dashboard = /** @class */ (function () {
    function Dashboard() {
    }
    Dashboard.home = function (req, res) {
        res.send("hello only teachers can see this page bro!");
    };
    return Dashboard;
}());
exports.Dashboard = Dashboard;
