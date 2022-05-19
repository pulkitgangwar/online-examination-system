"use strict";
exports.__esModule = true;
exports.parseDateAndTime = void 0;
var parseDateAndTime = function (date) {
    var currentDate = new Date(date);
    //   return "tw";
    return currentDate.toLocaleDateString(undefined, {
        day: "2-digit",
        year: "numeric",
        month: "long",
        hour12: true,
        hour: "2-digit",
        minute: "2-digit"
    });
};
exports.parseDateAndTime = parseDateAndTime;
