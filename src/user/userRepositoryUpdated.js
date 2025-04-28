import mongoose from "mongoose";
import { userSchema } from "./userSchema.js";
import { ApplicationError } from "../middleware/ApplicationError.js";

let userModel = mongoose.model("users", userSchema);

export class UserRepository {
  async signUp(user) {
    try {
      let newUserModel = new userModel(user);
      await newUserModel.save();
      return newUserModel;
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        throw error;
      }
      throw new ApplicationError("Something went wrong", 500);
    }
  }
  async signIn(email, password) {
    try {
      return userModel.findOne({ email, password });
    } catch (error) {
      throw new ApplicationError("Something went wrong", 500);
    }
  }
  async FindUser(email) {
    try {
      return userModel.findOne({ email });
    } catch (error) {
      throw new ApplicationError("Something went wrong", 500);
    }
  }
  async ResetPassword(userID, newPassword) {
    try {
      let user = await userModel.findById(userID);
      if (user) {
        user.password = newPassword;
        user.save();
        return user;
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      throw new ApplicationError("Something went wrong", 500);
    }
  }
}
