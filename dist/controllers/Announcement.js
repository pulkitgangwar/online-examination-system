"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Announcement = void 0;
const client_1 = require("../config/client");
const parseDate_1 = require("../utils/parseDate");
class Announcement {
    static showAllAnnoucements(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const announcements = yield client_1.prisma.announcement.findMany({
                    orderBy: { updatedAt: "desc" },
                    include: {
                        user: {
                            select: {
                                name: true,
                                id: true,
                            },
                        },
                    },
                });
                res.render("announcement/announcements", {
                    announcements: announcements.map((announcement) => (Object.assign(Object.assign({}, announcement), { isEditable: announcement.user.id === req.user.id, createdAt: (0, parseDate_1.parseDate)(announcement.createdAt.toISOString()) }))),
                });
            }
            catch (err) {
                console.log(err, "err in ann controller");
            }
        });
    }
    static addAnnouncement(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.render("announcement/add");
        });
    }
    static addAnnouncementCallback(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { description } = req.body;
                if (!description) {
                    return res.render("announcement/add", {
                        error: "please provide announcement",
                    });
                }
                const announcement = yield client_1.prisma.announcement.create({
                    data: {
                        description,
                        userId: req.user.id,
                    },
                });
                if (!announcement) {
                    return res.render("announcement/add", {
                        error: "something went wrong please try again later",
                    });
                }
                res.redirect("/announcement");
            }
            catch (err) {
                console.log(err, "error in announcement controller");
            }
        });
    }
    static editAnnouncement(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.params.announcementId) {
                return res.redirect("/announcement");
            }
            const announcement = yield client_1.prisma.announcement.findFirst({
                where: { id: req.params.announcementId },
            });
            if (!announcement) {
                return res.redirect("/announcement");
            }
            res.render("announcement/edit", {
                description: announcement.description,
                id: announcement.id,
            });
        });
    }
    static editAnnouncementCallback(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { description, id } = req.body;
                if (!description || !id)
                    return res.redirect("/announcement");
                const announcement = yield client_1.prisma.announcement.update({
                    where: {
                        id,
                    },
                    data: {
                        description,
                        updatedAt: new Date(),
                    },
                });
                res.redirect("/announcement");
            }
            catch (err) {
                console.log(err, "err in ann controller");
            }
        });
    }
    static deleteAnnouncement(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!((_a = req.params) === null || _a === void 0 ? void 0 : _a.announcementId))
                return res.redirect("/announcement");
            yield client_1.prisma.announcement.delete({
                where: { id: req.params.announcementId },
            });
            res.redirect("/announcement");
        });
    }
}
exports.Announcement = Announcement;
//# sourceMappingURL=Announcement.js.map