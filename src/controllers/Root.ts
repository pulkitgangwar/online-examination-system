import { Response } from "express";
import { RequestWithUser } from "../interface/interface";

export class Root {
  static async home(req: RequestWithUser, res: Response): Promise<void> {
    res.render("home/home", { picture: req.user.picture });
  }
}
