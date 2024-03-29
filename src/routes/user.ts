import { DbUser } from "../controllers/User";
import { Router } from "express";

const router = Router();

router.get("/", DbUser.allUsers);
router.get("/student", DbUser.getStudents);
router.get("/teacher", DbUser.getTeachers);
router.get("/registration", DbUser.getUserRegistrations);
router.get("/registration/approve/:id", DbUser.approveUserRegistration);
router.get("/registration/decline/:id", DbUser.declineUserRegistration);
router.get("/add", DbUser.addUser);
router.post("/add", DbUser.addUserCallback);
router.get("/edit/:id", DbUser.editUser);
router.post("/edit/:id", DbUser.editUserCallback);
router.get("/delete/:id", DbUser.deleteUser);
router.get("/report/user/:userId", DbUser.showUserReports);

export default router;
