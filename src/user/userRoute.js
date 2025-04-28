import express from "express";

import userController from "./userController.js";
import { JwtAuth } from "../middleware/JwtAuth.js";

let newUserController = new userController();

let UserRoute = express.Router();

UserRoute.post("/signup", newUserController.signUp);
UserRoute.post("/signin", newUserController.signIn);
UserRoute.post("/reset", newUserController.resetPassword);

export default UserRoute;
