"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExpiryDate = void 0;
const getExpiryDate = () => {
    let expiryDate = new Date();
    expiryDate.setTime(expiryDate.getTime() + 7 * 24 * 60 * 60 * 1000);
    return expiryDate;
};
exports.getExpiryDate = getExpiryDate;
//# sourceMappingURL=getExpiryDate.js.map