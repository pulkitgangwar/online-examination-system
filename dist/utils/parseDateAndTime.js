"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDateAndTime = void 0;
const parseDateAndTime = (date) => {
    const currentDate = new Date(date);
    //   return "tw";
    return currentDate.toLocaleDateString(undefined, {
        day: "2-digit",
        year: "numeric",
        month: "long",
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
    });
};
exports.parseDateAndTime = parseDateAndTime;
//# sourceMappingURL=parseDateAndTime.js.map