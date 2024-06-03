import express from "express";
import { create, get, getAll, remove, update } from "../controllers/message";

const messageRoute = express.Router();

messageRoute.get("/", getAll);

messageRoute.get("/:id", get);

messageRoute.post("/create", create);

messageRoute.post("/:id", update);

messageRoute.post("/:id", remove);

export { messageRoute };
