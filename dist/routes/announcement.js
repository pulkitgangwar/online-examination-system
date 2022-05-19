"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Announcement_1 = require("../controllers/Announcement");
const router = (0, express_1.Router)();
router.get("/", Announcement_1.Announcement.showAllAnnoucements);
router.get("/add", Announcement_1.Announcement.addAnnouncement);
router.post("/add", Announcement_1.Announcement.addAnnouncementCallback);
router.get("/edit/:announcementId", Announcement_1.Announcement.editAnnouncement);
router.post("/edit", Announcement_1.Announcement.editAnnouncementCallback);
router.delete("/delete/:announcementId", Announcement_1.Announcement.deleteAnnouncement);
exports.default = router;
//# sourceMappingURL=announcement.js.map