import { Router } from "express";
import { Register } from "../controllers/Register";
import { Auth } from "../controllers/Auth";
const router = Router();

router.get("/google", Auth.signIn);

router.get("/google/callback", Auth.signInCallback);

router.get("/register", Register.register);
router.post("/register/save", Register.saveRegistration);

router.get("/logout", Auth.logOut);

export default router;
