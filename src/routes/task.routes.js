import express from "express";
import { createTask, getAllTasks, getTask } from "../controllers/task.controller.js";

const route = express.Router();

route.get("/", getAllTasks);
route.get("/:id", getTask);
route.post("/create", createTask);


export default route;
