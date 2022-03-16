import { RequestHandler } from "express";
import { getSession, getUser } from "../helpers/helpers";

export const authenticate = async (
  req: any,
  res: any,
  next: any
): Promise<void> => {
  try {
    if (!req.signedCookies?.sid) {
      res.redirect("/auth/google");
      return;
    }
    const session = await getSession(req.signedCookies.sid);
    if (!session) {
      res.redirect("/auth/google");
      return;
    }

    // check expiry

    const user = await getUser(session.userId);
    if (!user) {
      res.redirect("/auth/google");
      return;
    }
    req.user = user;

    next();
  } catch (err) {
    console.log(err, "err in middleware");
  }
};
