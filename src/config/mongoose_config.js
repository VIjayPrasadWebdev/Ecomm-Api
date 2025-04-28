import mongoose from "mongoose";
import dotenv from "dotenv";
import { categorySchema } from "../product/categorySchema.js";
dotenv.config();
let url = process.env.DB_URL;

export async function MongooseViaMongodbConnect() {
  try {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("MongoDB is connected via Mongoose");
    // addCategories();
  } catch (error) {
    console.log(err);
  }
}

// async function addCategories() {
//   let categoryModel = mongoose.model("categories", categorySchema);
//   let categories = await categoryModel.find();
//   if (!categories || categories.length == 0) {
//     await categoryModel.insertMany([
//       { categoryname: "games" },
//       { categoryname: "clothing" },
//     ]);
//   }
//   console.log("Categories are added");
// }
