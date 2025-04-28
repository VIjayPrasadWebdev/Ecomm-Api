import { ObjectId } from "mongodb";
import { getDB } from "../config/mongodb.js";
import { ApplicationError } from "../middleware/ApplicationError.js";
import mongoose from "mongoose";
import { productSchema } from "./productSchema.js";
import { reviewsSchema } from "./reviewsSchema.js";
import { categorySchema } from "./categorySchema.js";
let productModel = mongoose.model("products", productSchema);
let reviewModel = mongoose.model("reviews", reviewsSchema);
let categoryModel = mongoose.model("categories", categorySchema);
class productRepository {
  constructor(collection) {
    this.collection = collection;
  }
  async getCollection() {
    let db = await getDB();
    return db.collection(this.collection);
  }

  async addproduct(newProduct) {
    try {
      let product = await new productModel(newProduct);

      let saveproduct = await product.save();

      await categoryModel.updateMany(
        {
          _id: { $in: product.categories },
        },
        {
          $push: { products: new ObjectId(saveproduct.id) },
        }
      );
      // let collection = await this.getCollection();
      // await collection.insertOne(newProduct);
      // return newProduct;
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }
  async allProducts() {
    try {
      let collection = await this.getCollection();
      //return await collection.find().toArray();
      return collection
        .find()
        .project({
          productname: 1,
          productprice: 1,
          ratings: { $slice: 1 },
        })
        .toArray();
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }
  async singleProduct(id) {
    try {
      let collection = await this.getCollection();
      return await collection.findOne({ _id: new ObjectId(id) });
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async filterProduct(minPrice, category) {
    try {
      let collection = await this.getCollection();
      let filterExpression = {};
      if (minPrice) {
        filterExpression.price = { $gte: parseFloat(minPrice) };
      }
      // if (maxPrice) {
      //   filterExpression.price = {
      //     ...filterExpression.price,
      //     $lte: parseFloat(maxPrice),
      //   };
      // }
      if (category) {
        filterExpression = { $and: [{ category: category }, filterExpression] };
        filterExpression.category = category;
      }
      console.log("data", filterExpression);

      // return collection.find(filterExpression).toArray();
      return collection
        .find(filterExpression)
        .project({ name: 1, price: 1 })
        .toArray();
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  // async rateProduct(userID, productID, rating) {
  //   try {
  //     let collection = await this.getCollection();

  //     // find the product :
  //     let product = await collection.findOne({ _id: new ObjectId(productID) });

  //     // find the rating :

  //     let userRating = product?.ratings?.find((user) => user.userID == userID);

  //     // if exisiting rating :

  //     if (userRating) {
  //       await collection.updateOne(
  //         {
  //           _id: new ObjectId(productID),
  //           "rating.userID": new ObjectId(userID),
  //         },
  //         {
  //           $set: {
  //             "ratings.$.rating": rating,
  //           },
  //         }
  //       );
  //     } else {
  //       return await collection.updateOne(
  //         { _id: new ObjectId(productID) },
  //         {
  //           $push: { ratings: { userID: new ObjectId(userID), rating } },
  //         }
  //       );
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     throw new ApplicationError("Something went wrong with database", 500);
  //   }
  // }
  async rateProduct(userID, productID, rating) {
    try {
      // let collection = await this.getCollection();
      // await collection.updateOne(
      //   {
      //     _id: new ObjectId(productID),
      //   },
      //   {
      //     $pull: { ratings: { userID: new ObjectId(userID) } },
      //   }
      // );
      // await collection.updateOne(
      //   { _id: new ObjectId(productID) },
      //   {
      //     $push: { ratings: { userID: new ObjectId(userID), rating } },
      //   }
      // );

      // check product exists :
      let findproductID = await productModel.findById(productID);
      if (!findproductID) {
        throw new Error("Product not found");
      }

      // check existing review :
      let userReview = await reviewModel.findOne({
        product: new ObjectId(productID),
        user: new ObjectId(userID),
      });

      if (userReview) {
        userReview.rating = rating;
        await userReview.save();
      } else {
        // new rating :
        let newReview = new reviewModel({
          product: new ObjectId(productID),
          user: new ObjectId(userID),
          rating: rating,
        });
        await newReview.save();
      }
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async AverageProductpricebyCategory() {
    try {
      let collection = await this.getCollection();
      return await collection
        .aggregate([
          {
            $group: {
              _id: "$productcategory",
              averagePrice: { $avg: "$productprice" },
            },
          },
        ])
        .toArray();
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }
}

export default new productRepository("products");
