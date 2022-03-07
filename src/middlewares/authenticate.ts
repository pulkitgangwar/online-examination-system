import { NextFunction, Response, Request } from "express";
import sessionStore from "../config/sessionStore.js";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.user);
  req.user ? next() : res.redirect("/auth/signin");
};
