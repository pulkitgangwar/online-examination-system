import { Router } from "express";
import passport from "passport";
const router = Router();

router.get("/signin", (req, res) => {
  res.render("auth/signin");
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/auth/signin",
  })
);

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    res.clearCookie("connect.sid", {
      httpOnly: true,
      maxAge: 8640000, // 1 day
    });
    res.redirect("/auth/signin");
  });
});

export default router;
