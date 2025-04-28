import { ApplicationError } from "../middleware/ApplicationError.js";
import userModel from "../user/userModel.js";
let productData = [
  {
    id: 1,
    productname: "Product 1",
    productdesc: "Description for Product 1",
    productprice: 19.99,
    productimg:
      "https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg",
    productcategory: "Category1",
  },
  {
    id: 2,
    productname: "Product 2",
    productdesc: "Description for Product 2",
    productprice: 29.99,
    productimg:
      "https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg",
    productcategory: "Category2",
    productsize: ["M", "XL"],
  },
  {
    id: 3,
    productname: "Product 3",
    productdesc: "Description for Product 3",
    productprice: 39.99,
    productimg:
      "https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg",
    productcategory: "men",
    productsize: ["M", "XL", "S"],
  },
];

export default productData;

export let findSingleproduct = (id) => {
  return productData.find((productData) => productData.id == id);
};

export let filterproduct = (minPrice, maxPrice, category) => {
  return productData.filter((data) => {
    return (
      (!minPrice || data.productprice >= minPrice) &&
      (!maxPrice || data.productprice <= maxPrice) &&
      (!category || data.category === category)
    );
  });
};

export let handleproductRating = (userID, productID, rating) => {
  let findUserID = userModel.find((data) => data.id == userID);

  if (!findUserID) {
    throw new ApplicationError("User not found", 401);
  }

  let productModel = productData.find((data) => data.id == productID);
  if (!productModel) {
    throw new ApplicationError("Product not found", 401);
  }

  if (!productModel.rating) {
    productModel.rating = [{ userID, rating }];
  } else {
    let existingRating = productModel.rating.find(
      (data) => data.userID == userID
    );

    if (existingRating) {
      productModel.rating = rating;
    } else {
      productModel.rating.push = [{ userID, rating }];
    }
  }
};
