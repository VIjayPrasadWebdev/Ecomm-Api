import mongoose from "mongoose";

export let categorySchema = new mongoose.Schema({
  categoryname: {
    type: String,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
    },
  ],
});
