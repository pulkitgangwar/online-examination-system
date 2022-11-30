import { Request, Response } from "express";
import { prisma } from "../config/client";

export class Register {
  static async register(req: Request, res: Response): Promise<void> {
    const settings = await prisma.settings.findFirst({
      where: { id: "1" },
    });

    if (settings.registration) {
      res.render("auth/register", { layout: "main" });
    } else {
      res.redirect("/auth/google?_error='registration closed'");
    }
  }

  static async saveRegistration(req: Request, res: Response): Promise<void> {
    try {
      const registration: any = req.body;

      const response = await prisma.registration.create({
        data: {
          email: registration.email,
          semester: registration.semester,
          name: registration.name,
          crn: registration.semester === 1 ? null : registration.crn,
          totalMarks:
            registration.semester === 1 ? null : registration.totalMarks,
        },
      });

      console.log(response);

      res.send(response);
    } catch (er) {
      console.log(er.message);
      console.log(JSON.stringify(er));
      res.render("auth/register", { layout: "main" });
    }
  }
}
