"use strict";
exports.__esModule = true;
exports.parseTime = void 0;
var parseTime = function (timeInSeconds) {
    var h = Math.floor(timeInSeconds / 3600);
    var m = Math.floor((timeInSeconds % 3600) / 60);
    var s = Math.floor((timeInSeconds % 3600) % 60);
    if (h < 10) {
        h = "0".concat(h);
    }
    if (m < 10) {
        m = "0".concat(m);
    }
    if (s < 10) {
        s = "0".concat(s);
    }
    return "".concat(h, ":").concat(m, ":").concat(s);
};
exports.parseTime = parseTime;
