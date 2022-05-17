import { AuthSession } from "../services/Session";

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
    const session = await AuthSession.findSession(req.signedCookies.sid);

    // check session exists or not
    if (!session) {
      res.redirect("/auth/google");
      return;
    }

    // check expiry
    if (session.expiresAt <= new Date()) {
      await AuthSession.deleteSession(req.signedCookies.sid);
      res.clearCookie("sid", {
        httpOnly: true,
        signed: true,
      });

      res.redirect("/auth/google");
      return;
    }

    req.user = session.user;

    next();
  } catch (err) {
    console.log(err, "err in middleware");
  }
};
