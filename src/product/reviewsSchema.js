import mongoose from "mongoose";

export let reviewsSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  rating: Number,
});
