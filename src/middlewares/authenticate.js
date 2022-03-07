import sessionStore from "../config/sessionStore.js";

export const authenticate = async (req, res, next) => {
  console.log(req.user);
  req.user ? next() : res.redirect("/auth/signin");
};
