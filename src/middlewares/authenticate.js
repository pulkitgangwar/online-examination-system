export const authenticate = async (req, res, next) => {
  req.user ? next() : res.redirect("/auth/signin");
};
