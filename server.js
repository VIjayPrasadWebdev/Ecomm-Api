import express from "express";
import swagger from "swagger-ui-express";
import dotenv from "dotenv";
import productRoute from "./src/product/productRoute.js";
import UserRoute from "./src/user/userRoute.js";
import orderRoute from "./src/order/orderRoute.js";
import { BasicAuth } from "./src/middleware/BasicAuth.js";
import { JwtAuth } from "./src/middleware/JwtAuth.js";
import cartRoute from "./src/cart/cartRoute.js";
import fs from "fs";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import LoggerMiddleware from "./src/middleware/loggerMiddleware.js";
import { log } from "console";
import { ApplicationError } from "./src/middleware/ApplicationError.js";
import { ConnectMongoDB } from "./src/config/mongodb.js";
import { MongooseViaMongodbConnect } from "./src/config/mongoose_config.js";
import mongoose from "mongoose";
import likeRoute from "./like/likeRoute.js";
//import apidocs from "./swagger.json" assert { type: "json" };
const apidocs = JSON.parse(fs.readFileSync("./swagger.json", "utf-8"));

//const apidocs = await import("./swagger.json", { assert: { type: "json" } });
let server = express();
let port = 3004;

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// server.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "*");
//   res.header("Access-Control-Allow-Methods", "*");
//   if (req.method == "OPTIONS") {
//     return res.sendStatus(200);
//   }
//   next();
// });

server.use(cors());
server.use(LoggerMiddleware);

server.use("/api/docs", swagger.serve, swagger.setup(apidocs));
//server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
server.use("/api/product", productRoute);
server.use("/api/user", UserRoute);

server.use("/api/cart", cartRoute);

server.use("/api/likes", JwtAuth, likeRoute);
server.use("/api/order", orderRoute);
server.get("/", (req, res) => {
  res.send("Ecomm Api");
});

server.use((req, res) => {
  res.status(401).send("Api not found");
});

server.use((err, req, res, next) => {
  if (err instanceof mongoose.Error.ValidationError) {
    res.status(400).send(err.message);
  }
  if (err instanceof ApplicationError) {
    res.status(err.status).send(err.message);
  }
  //  console.log(err);
  res.status(500).send("Something is went wrong");
  next();
});
server.listen(port, () => {
  console.log("Server is connected");
  // ConnectMongoDB();
  MongooseViaMongodbConnect();
});
