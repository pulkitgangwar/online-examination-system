import sessionStore from "../config/sessionStore.js";

export const authenticate = async (req, res, next) => {
  sessionStore.get(req.signedCookies["connect.sid"], (err, session) => {
    console.log(session);
  });
  req.user ? next() : res.redirect("/auth/signin");
};
