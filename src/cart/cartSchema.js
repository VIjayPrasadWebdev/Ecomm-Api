import mongoose from "mongoose";

export let cartSchema = new mongoose.Schema({
  productID: { type: ObjectId, ref: "products" },
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  quantity: Number,
});
