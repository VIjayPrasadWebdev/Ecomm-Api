import { getDB } from "../config/mongodb.js";
class UserRepository {
  constructor(collection) {
    this.collection = collection;
  }

  async getCollection() {
    const db = await getDB();
    return db.collection(this.collection);
  }

  async insertUser(newUser) {
    const collection = await this.getCollection();
    return await collection.insertOne(newUser);
  }

  async FindUser(email) {
    let collection = await this.getCollection();
    return await collection.findOne({ email });
  }
}

export default new UserRepository("users");
