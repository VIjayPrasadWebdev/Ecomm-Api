import likeRepository from "./likeRepository.js";

class likeController {
  async getlikes(req, res) {
    try {
      let { id, type } = req.query;
      let likes = likeRepository.getlikes(id, type);
      res.status(200).send(likes);
    } catch (error) {
      throw new ApplicationError("Something went wrong", 500);
    }
  }
  async likeItem(req, res) {
    try {
      let { id, type } = req.body;
      let userID = req.userID;
      if (!type == "products" && !type == "categories") {
        res.status(400).send("Invalid Type");
      }
      if (type == "products") {
        likeRepository.likeproduct(userID, id);
      } else {
        likeRepository.likecategory(userID, id);
      }
      res.status(201).send(`Likes added, ${userID}, ${type}`);
    } catch (error) {
      throw new ApplicationError("Something went wrong", 500);
    }
  }
}
export default likeController = new likeController();
