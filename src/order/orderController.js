import orderRepository from "./orderRepository.js";

export default class orderController {
  async playOrder(req, res) {
    try {
      let userID = req.userID;
      let result = await orderRepository.placeOrder(userID);
      res.status(201).send("Order is created");
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Something went wrong" });
    }
  }
}
