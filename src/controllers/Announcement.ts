import { RequestWithUser } from "../interface/interface";
import { Response } from "express";
import { prisma } from "../config/client";
import { parseDate } from "../utils/parseDate";

export class Announcement {
  static async showAllAnnoucements(
    req: RequestWithUser,
    res: Response
  ): Promise<void> {
    try {
      const announcements = await prisma.announcement.findMany({
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
        announcements: announcements.map((announcement) => ({
          ...announcement,
          isEditable: announcement.user.id === req.user.id,
          createdAt: parseDate(announcement.createdAt.toISOString()),
        })),
      });
    } catch (err) {
      console.log(err, "err in ann controller");
    }
  }

  static async addAnnouncement(
    req: RequestWithUser,
    res: Response
  ): Promise<void> {
    res.render("announcement/add");
  }

  static async addAnnouncementCallback(
    req: RequestWithUser,
    res: Response
  ): Promise<void> {
    try {
      const { description }: { description: string } = req.body;

      if (!description) {
        return res.render("announcement/add", {
          error: "please provide announcement",
        });
      }

      const announcement = await prisma.announcement.create({
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
    } catch (err) {
      console.log(err, "error in announcement controller");
    }
  }

  static async editAnnouncement(
    req: RequestWithUser,
    res: Response
  ): Promise<void> {
    if (!req.params.announcementId) {
      return res.redirect("/announcement");
    }

    const announcement = await prisma.announcement.findFirst({
      where: { id: req.params.announcementId },
    });

    if (!announcement) {
      return res.redirect("/announcement");
    }

    res.render("announcement/edit", {
      description: announcement.description,
      id: announcement.id,
    });
  }

  static async editAnnouncementCallback(
    req: RequestWithUser,
    res: Response
  ): Promise<void> {
    const { description, id } = req.body;
    // if (!description || id) return res.redirect("/announcement");

    console.log(id);
  }
}
