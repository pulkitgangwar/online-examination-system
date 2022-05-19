"use strict";
exports.__esModule = true;
exports.parseDate = void 0;
var parseDate = function (date) {
    var currentDate = new Date(date);
    //   return "tw";
    return currentDate.toLocaleDateString(undefined, {
        day: "2-digit",
        year: "numeric",
        month: "long"
    });
};
exports.parseDate = parseDate;
