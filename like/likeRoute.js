import express from "express";
import { Router } from "express";
import likeController from "./likeController.js";

let likeRoute = express.Router();

likeRoute.post("/", likeController.likeItem);
likeRoute.get("/", likeController.getlikes);

export default likeRoute;
