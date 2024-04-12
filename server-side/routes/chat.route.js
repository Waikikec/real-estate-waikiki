import express from "express";
import {
  createChat,
  getChat,
  getChats,
  readChat,
} from "../controllers/chat.controller.js";

import { verifyToken } from "../middleware/verifyToken.js";

const chatRoute = express.Router();

chatRoute.get("/", verifyToken, getChats);
chatRoute.get("/:id", verifyToken, getChat);
chatRoute.post("/", verifyToken, createChat);
chatRoute.put("/read/:id", verifyToken, readChat);

export default chatRoute;
