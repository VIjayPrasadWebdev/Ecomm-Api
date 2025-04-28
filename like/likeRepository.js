import mongoose from "mongoose";
import { likeSchema } from "./likeSchema.js";
import { ObjectId } from "mongodb";

let likeModel = mongoose.model("like", likeSchema);
class likeRepository {
  async getlikes(id, type) {
    let getlikes = await likeModel
      .find({
        likable: new ObjectId(id),
        types: type,
      })
      .populate("users")
      .populate({ path: "likable", model: type });
    return getlikes;
  }
  async likeproduct(userid, productid) {
    let newlike = new likeModel({
      user: new ObjectId(userid),
      likable: new ObjectId(productid),
      types: "products",
    });
    await newlike.save();
  }
  async likecategory(userid, categoryid) {
    let newlike = new likeModel({
      user: new ObjectId(userid),
      likable: new ObjectId(categoryid),
      types: "categories",
    });
    await newlike.save();
  }
}
export default likeRepository = new likeRepository();
