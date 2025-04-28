import { ObjectId } from "mongodb";
import { getClient, getDB } from "../config/mongodb.js";
import orderModel from "./orderModel.js";

class orderRepository {
  constructor(collection) {
    this.collection = collection;
  }

  async getCollection() {
    let db = await getDB();

    return db.collection(this.collection);
  }

  async placeOrder(userId) {
    let client = await getClient();
    let session = await client.startSession();
    session.startTransaction();
    let collection = await this.getCollection();

    // Ensure getTotalAmount returns valid data
    let items = await this.getTotalAmount(userId, session);
    if (!items || items.length === 0) {
      console.error("No items found in cart for user:", userId);

      return;
    }

    let finalAmount = items.reduce(
      (acc, product) => acc + product.totalAmount,
      0
    );
    console.log("finalAmount", finalAmount);

    // create new order
    let newOrder = {
      userID: new ObjectId(userId),
      totalAmount: finalAmount,
      timestamp: new Date(),
    };

    await collection.insertOne(newOrder, { session });

    let db = await getDB();

    let productsCollection = db.collection("products");
    let cartCollection = db.collection("cart");

    // Reduce stock for each purchased item
    for (let item of items) {
      await productsCollection.updateOne(
        { _id: item.productID },
        { $inc: { stock: -item.quantity } },
        { session }
      );
    }

    // Delete cart items
    await cartCollection.deleteMany(
      { userID: new ObjectId(userId) },
      { session }
    );
  }

  async getTotalAmount(userID, session) {
    let db = await getDB();
    let collection = db.collection("cart");

    let result = await collection
      .aggregate(
        [
          {
            $match: {
              userID: new ObjectId(userID),
            },
          },
          {
            $lookup: {
              from: "products",
              localField: "productID",
              foreignField: "_id",
              as: "productInfo",
            },
          },
          {
            $unwind: "$productInfo",
          },
          {
            $addFields: {
              totalAmount: {
                $multiply: ["$productInfo.productprice", "$quantity"],
              },
            },
          },
        ],
        { session }
      )
      .toArray();

    console.log("orders", result);
    return result; // Ensure result is returned properly
  }
}

export default new orderRepository("orders");
