import { Request, Response } from "express";
import { getUsersGoogleData, googleAuthUrl } from "../strategy/google";
import { Query } from "../interface/interface";
import { createUserAndSession } from "../helpers/helpers";
import { prisma } from "../config/client";

export class Auth {
  static signIn(req: Request, res: Response): void {
    res.render("auth/signin", { googleAuthUrl });
  }

  static async signInCallback(
    req: Request<{}, {}, {}, Query>,
    res: Response
  ): Promise<void> {
    try {
      if (!req.query?.code) {
        res.redirect("/auth/google");
        return;
      }
      const code = req.query.code;

      const userInfo = await getUsersGoogleData(code);

      const session = await createUserAndSession(userInfo);
      res.cookie("sid", session.id, {
        signed: true,
        httpOnly: true,
      });
      res.redirect("/");
    } catch (err) {
      console.log(err);
      console.log(err.message, "inside error block bro!");
      res.redirect("/auth/google");
    }
  }

  static async logOut(req: Request, res: Response): Promise<void> {
    const sid = req.signedCookies.sid;

    await prisma.session.delete({ where: { id: sid } });

    res.clearCookie("sid", {
      httpOnly: true,
      signed: true,
    });

    res.redirect("/auth/google");
  }
}
