import express from "express"
import tutorRoutes from "./tutor.routes.js"

const router = express.Router();

router.use("/tutors", tutorRoutes)

export default router;