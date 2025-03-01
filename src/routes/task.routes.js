import {Router} from "express";
import { createTask, getAllTasks, getTask } from "../controllers/task.controller.js";

const route = Router();

route.get("/", getAllTasks);
route.get("/:id", getTask);
route.post("/create", createTask);


export default route;
