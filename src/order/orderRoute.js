import express from "express";
import orderController from "./orderController.js";

const Route = express.Router();
let neworderController = new orderController();

Route.post("/", neworderController.playOrder);
export default Route;
