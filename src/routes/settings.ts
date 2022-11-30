import { Router } from "express";
import { Setting } from "../controllers/Setting";

const router = Router();

router.get("/", Setting.getSettings);
router.get("/toggle", Setting.toggleRegistration);

export default router;
