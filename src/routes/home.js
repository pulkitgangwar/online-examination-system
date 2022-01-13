import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  console.log(req.session);
  console.log(req.user);
  res.render("home/index");
});

export default router;
