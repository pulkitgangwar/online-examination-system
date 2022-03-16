import { Router } from "express";
import { Root } from "../controllers/Root";
const router = Router();

router.get("/", Root.home);

export default router;
