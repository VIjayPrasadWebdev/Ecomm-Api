import express from "express";
import ProductController from "./productController.js";
import { fileUpload } from "../middleware/fileupload.js";

const Route = express.Router();

const newProductController = new ProductController();
Route.post(
  "/",
  fileUpload.single("productimg"),
  newProductController.addProduct
);
Route.get("/", newProductController.getProduct);

Route.post("/rating", newProductController.rateProduct);
Route.get("/filter", newProductController.getfilteredproduct);

Route.get("/average", newProductController.averagePrice);

Route.get("/:id", newProductController.getOneProduct);

export default Route;
