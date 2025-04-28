import mongoose from "mongoose";

export let productSchema = new mongoose.Schema({
  productname: String,
  productdesc: String,
  productprice: Number,
  productcategory: String,
  productinstock: String,
  review: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "reviews",
    },
  ],
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
    },
  ],
});
