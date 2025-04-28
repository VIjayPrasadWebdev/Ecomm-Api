import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
let url = process.env.DB_URL;
console.log("url", url);

let client;
export function ConnectMongoDB() {
  MongoClient.connect(url)
    .then((clientInstance) => {
      client = clientInstance;
      console.log("DB connected");
      counterFun(client.db());
      CreateIndexes(client.db());
    })
    .catch((err) => console.log(err));
}

export function getDB() {
  return client.db();
}

export function getClient() {
  return client;
}

export async function counterFun(db) {
  let existingCounter = await db
    .collection("counters")
    .findOne({ _id: "CartID" });
  if (!existingCounter) {
    await db.collection("counters").insertOne({ _id: "CartID", value: 0 });
  }
}

export async function CreateIndexes(db) {
  try {
    await db.collection("products").createIndex({ productprice: 1 });
    await db
      .collection("products")
      .createIndex({ productname: 1, productcategory: -1 });
    await db.collection("products").createIndex({ productdesc: "text" });
  } catch (error) {
    console.log(err);
  }

  console.log("Indexes are created");
}
