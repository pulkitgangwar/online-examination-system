"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseTime = void 0;
const parseTime = (timeInSeconds) => {
    let h = Math.floor(timeInSeconds / 3600);
    let m = Math.floor((timeInSeconds % 3600) / 60);
    let s = Math.floor((timeInSeconds % 3600) % 60);
    if (h < 10) {
        h = `0${h}`;
    }
    if (m < 10) {
        m = `0${m}`;
    }
    if (s < 10) {
        s = `0${s}`;
    }
    return `${h}:${m}:${s}`;
};
exports.parseTime = parseTime;
//# sourceMappingURL=parseTime.js.map