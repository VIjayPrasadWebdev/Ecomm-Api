import express from "express";
import cartController from "./cartController.js";

let cartRoute = express.Router();

let newCartController = new cartController();
cartRoute.delete("/:id", newCartController.deleteCartItems);
cartRoute.post("/", newCartController.addCartItems);
cartRoute.get("/", newCartController.getcartItems);

export default cartRoute;
