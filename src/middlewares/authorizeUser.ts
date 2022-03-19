import { NextFunction, Response } from "express";
import { RequestWithUser, Role } from "../interface/interface";

export const authorizeUser = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (req.user.role !== Role.TEACHER) {
    res.redirect("/");
    return;
  }

  next();
};
