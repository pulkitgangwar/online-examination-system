"use strict";
exports.__esModule = true;
exports.getExpiryDate = void 0;
var getExpiryDate = function () {
    var expiryDate = new Date();
    expiryDate.setTime(expiryDate.getTime() + 7 * 24 * 60 * 60 * 1000);
    return expiryDate;
};
exports.getExpiryDate = getExpiryDate;
