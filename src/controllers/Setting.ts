import { Response } from "express";
import { prisma } from "../config/client";
import { RequestWithUser } from "../interface/interface";

export class Setting {
  static async getSettings(req: RequestWithUser, res: Response) {
    const settings = await prisma.settings.findFirst({ where: { id: "1" } });

    res.render("settings/all-settings", {
      registration: settings.registration,
    });
  }

  static async toggleRegistration(req: RequestWithUser, res: Response) {
    const settings = await prisma.settings.findFirst({
      where: { id: "1" },
    });

    const updatedSettings = await prisma.settings.update({
      where: { id: "1" },
      data: {
        registration: !settings.registration,
      },
    });

    res.redirect("/settings");
  }
}
