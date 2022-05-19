"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDate = void 0;
const parseDate = (date) => {
    const currentDate = new Date(date);
    //   return "tw";
    return currentDate.toLocaleDateString(undefined, {
        day: "2-digit",
        year: "numeric",
        month: "long",
    });
};
exports.parseDate = parseDate;
//# sourceMappingURL=parseDate.js.map