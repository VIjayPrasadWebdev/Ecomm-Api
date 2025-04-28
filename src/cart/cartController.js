import { ObjectId } from "mongodb";
import cartModel, { DeleteItem, findUser } from "./cartModel.js";
import cartRepository from "./cartRepository.js";
export default class cartController {
  async addCartItems(req, res) {
    // let id = cartModel.length + 1;
    let { productID, quantity } = req.body;
    let userID = req.userID;
    // let newCart = {
    //   productID,
    //   userID,
    //   quantity,
    // };
    //   cartModel.push(newCart);
    //   console.log(cartModel);

    await cartRepository.addproductsinCart(productID, userID, quantity);
    res.status(201).send("Cart is updated");
  }

  async getcartItems(req, res) {
    let userID = req.userID;

    let item = await cartRepository.getproductsinCart(userID);
    //  console.log(item);

    if (item) {
      res.status(200).send(item);
    }
  }

  async deleteCartItems(req, res) {
    let userID = req.userID;
    let cartID = req.params.id;
    let item = await cartRepository.deleteproductsinCart(userID, cartID);
    console.log(item);

    res.status(401).send("Bad request");
  }
}
