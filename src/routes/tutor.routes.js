import express from "express";
// import Tutor from "../models/tutor.model"
import { loginTutor, logoutTutor, profileTutor, registerTutor } from "../controllers/tutor.controller.js";
import { auth } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/register", registerTutor);
router.post("/login", loginTutor);
router.post("/logout",logoutTutor)
router.get("/me",auth)
router.get("/profile", auth, profileTutor);


export default router;
