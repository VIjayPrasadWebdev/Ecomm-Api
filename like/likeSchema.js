import mongoose from "mongoose";

export let likeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  likable: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "types",
  },
  types: {
    type: String,
    enum: ["products", "categories"],
  },
})
  .pre("save", (next) => {
    console.log("like incoming");
    next();
  })
  .post("save", (doc) => {
    console.log("Like saved");

    console.log(doc);
  });
