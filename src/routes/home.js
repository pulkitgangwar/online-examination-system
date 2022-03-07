import { Router } from "express";
import { User } from "../models/User.js";
const router = Router();

router.get("/", async (req, res) => {
  const user = await User.findOne({ where: { email: req.user.email } });
  console.log(user.getDataValue("picture"));
  res.render("home/index", {
    picture: user.getDataValue("picture"),
  });
});

export default router;
