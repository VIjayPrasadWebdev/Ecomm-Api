import { getDB } from "../config/mongodb.js";

let userModel = [
  {
    id: 1,
    name: "Seller1",
    email: "seller@gmail.com",
    password: "pass",
  },
  {
    id: 2,
    name: "Ajay",
    email: "ajay@gmail.com",
    pass: "ajay",
  },
];

export default userModel;

// let db = getDB();
// export let collection = db.collection("userModel");
export let findUser = (email, password) => {
  return userModel.find(
    (data) => data.email == email && data.password == password
  );
};
