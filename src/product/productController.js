import { ObjectId } from "mongodb";
import productData, {
  filterproduct,
  findSingleproduct,
  handleproductRating,
} from "./productModel.js";
import productRepository from "./productRepository.js";

export default class ProductController {
  // constructor() {
  //   const NewproductRepository = new productRepository("products");
  // }
  async getProduct(req, res) {
    let Allproducts = await productRepository.allProducts();
    res.status(200).json(Allproducts);
  }
  async addProduct(req, res) {
    try {
      const {
        productname,
        productdesc,
        productprice,
        productcategory,
        productsize,
      } = req.body;

      const newProduct = {
        productname,
        productprice,
        productsize,
        productdesc,
        productprice: parseFloat(productprice),
        productcategory,
        productsize: productsize.split(","),
      };
      console.log("new product data", newProduct);

      const result = await productRepository.addproduct(newProduct);
      console.log("result", result);

      res.status(201).send(result);
    } catch (err) {
      res.status(500).send("Something went wrong", err);
    }
  }

  async getOneProduct(req, res) {
    try {
      let id = req.params.id;

      // Validate ObjectId
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid product ID" });
      }

      let singleproduct = await productRepository.singleProduct(
        new ObjectId(id)
      );

      if (!singleproduct) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.status(200).json(singleproduct);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Something went wrong" });
    }
  }
  async rateProduct(req, res) {
    //  console.log("body", req.query);
    console.log(productData);

    let userID = req.userID;
    let { productID, rating } = req.body;

    let Ratings = await productRepository.rateProduct(
      userID,
      productID,
      rating
    );

    // if (!Ratings) {
    //   res.status(201).send("Rating created successfully");
    // } else {
    //   res.status(401).send("Rating is already available");
    // }
    try {
      res.status(201).send("Rating created successfully");
    } catch (error) {
      res.status(500).send("An error occurred: " + error);
    }
  }

  // query paramater :

  //http://localhost:3002/api/product/filter?catergory=shirt&price=5500

  async getfilteredproduct(req, res) {
    try {
      let minPrice = req.query.minPrice;
      // let maxPrice = req.query.maxPrice;
      let category = req.query.category;
      console.log(req.query);

      console.log(category);

      // console.log(req.body);
      //  let { minPrice, maxPrice, category } = req.body;

      let result = await productRepository.filterProduct(minPrice, category);
      console.log("filtered product", result);

      res.status(200).send(result);
    } catch (err) {
      res.status(500).json({ error: "Something went wrong" });
    }
  }
  async averagePrice(req, res) {
    try {
      let result = await productRepository.AverageProductpricebyCategory();
      res.status(200).send(result);
    } catch (err) {
      res.status(500).json({ error: "Something went wrong" });
    }
  }
}
