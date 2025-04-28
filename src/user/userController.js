// import { getDB } from "../config/mongodb.js";
import { ApplicationError } from "../middleware/ApplicationError.js";
import userModel, { findUser } from "./userModel.js";
import jwt from "jsonwebtoken";
import userRepository from "./userRepository.js";
import bcrypt, { hash } from "bcrypt";
import { UserRepository } from "./userRepositoryUpdated.js";
let newUserRepository = new UserRepository();
export default class userController {
  async signUp(req, res, next) {
    //  console.log("data", req.body);
    try {
      let { _id, name, email, password } = req.body;
      // let id = userModel.length + 1;

      let hashedPassword = await bcrypt.hash(password, 12);

      let newUser = { _id, name, email, password: hashedPassword };
      //userModel.push(newUser);
      // let db = await getDB();
      // let collection = db.collection("users");
      // let result = await collection.insertOne(newUser);
      // await res.status(201).send(result);
      // let userRepository = UserRepository();
      let result = await newUserRepository.signUp(newUser);
      await res.status(201).json(result);
    } catch (err) {
      next(err);
      //throw new ApplicationError("Something went wrong", 500);
    }
  }
  async signIn(req, res) {
    let { email, password } = req.body;
    let Authenticateuser = await newUserRepository.FindUser(email);
    console.log(Authenticateuser);

    if (!Authenticateuser) {
      res.status(400).send("Invalid Credentials");
    } else {
      let secretKey = process.env.SECRET_KEY;

      let result = await bcrypt.compare(password, Authenticateuser.password);
      if (result) {
        let createJWTtoken = jwt.sign(
          { userID: Authenticateuser._id, userEmail: Authenticateuser.email },
          secretKey,
          {
            expiresIn: "1hr",
          }
        );
        res.status(201).send(createJWTtoken);
        console.log("Token", createJWTtoken);
      } else {
        res.status(400).send("Invalid Credentials");
      }
      // let {  } = req.body;
    }
  }
  async resetPassword(req, res) {
    try {
      let { newpassword } = req.body;
      let userID = req.userID;
      let hashedPassword = await bcrypt.hash(newpassword, 12);
      await newUserRepository.ResetPassword(userID, hashedPassword);
      res.status(201).send("Password is resetted");
    } catch (err) {
      throw new ApplicationError("Something went wrong", 500);
    }
  }
}
