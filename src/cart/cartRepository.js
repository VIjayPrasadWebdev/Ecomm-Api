import { ObjectId } from "mongodb";
import { getDB } from "../config/mongodb.js";
import { ApplicationError } from "../middleware/ApplicationError.js";
class cartRepository {
  constructor(collection) {
    this.collection = collection;
  }
  async getCollection() {
    let db = await getDB();
    return db.collection(this.collection);
  }

  async addproductsinCart(productID, userID, quantity) {
    try {
      //  let db = await getDB();
      let collection = await this.getCollection();
      // let id = await this.getNextCounter(db);
      return await collection.updateOne(
        { productID: new ObjectId(productID), userID: new ObjectId(userID) },

        {
          $inc: {
            quantity: quantity,
          },
        },
        { upsert: true }
      );
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }
  async getproductsinCart(userID) {
    try {
      let collection = await this.getCollection();
      return await collection.find({ userID: new ObjectId(userID) }).toArray();
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }
  async deleteproductsinCart(userID, cartID) {
    try {
      let collection = await this.getCollection();
      let result = await collection.deleteOne({
        userID: new ObjectId(userID),
        _id: new ObjectId(cartID),
      });
      return result.deletedCount > 0;
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async getNextCounter(db) {
    let counter = await db
      .collection("counters")
      .findOneAndUpdate(
        { _id: "cartID" },
        { $inc: { value: 1 } },
        { returnDocument: "after", upsert: true }
      );
    console.log(counter);

    return counter.value.value;
  }
}

export default new cartRepository("cart");
