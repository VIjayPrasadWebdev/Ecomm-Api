import jwt from "jsonwebtoken";
export let JwtAuth = (req, res, next) => {
  let token = req.headers["authorization"];
  // console.log("token", token);

  if (!token) {
    res.status(401).send("No authorization found");
  }

  let payload = jwt.verify(token, "Vijayprasad");
  req.userID = payload.userID;

  console.log(payload, req.userID);

  if (payload) {
    next();
  } else {
    res.status(401).send("Incorrect token");
  }
};
