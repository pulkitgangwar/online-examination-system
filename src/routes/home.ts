import { Router } from "express";
import { User } from "../models/User";
const router = Router();

router.get("/", async (req, res) => {
  const user = await User.findOne({
    where: { email: (req as any).user.email },
  });
  console.log(user.getDataValue("picture"));
  res.render("home/index", {
    picture: user.getDataValue("picture"),
  });
});

export default router;
