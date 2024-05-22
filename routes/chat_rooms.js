import express from "express";
import { create, get, getAll, remove, update } from "../controllers/chat_rooms.js";

const chatRoute = express.Router();

chatRoute.get("/", getAll);

chatRoute.get("/:id", get);

chatRoute.post("/create", create);

chatRoute.post("/:id", update);

chatRoute.post("/:id", remove);

export { chatRoute };
