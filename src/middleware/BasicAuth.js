import userModel from "../user/userModel.js";
export let BasicAuth = (req, res, next) => {
  let Authheaders = req.headers["authorization"];
  console.log("headers", Authheaders);
  if (!Authheaders) {
    res.status(401).send("No authorization found");
  }
  let base64encoded = Authheaders.replace("Basic", ",");
  console.log("encoded", base64encoded);
  let decodebase64 = Buffer(base64encoded, "base64").toString("utf-8");
  console.log("decoded", decodebase64);

  let Credentials = decodebase64.split(":");

  let findCorrectUser = userModel.find(
    (data) => data.email == Credentials[0] && data.password == Credentials[1]
  );

  if (findCorrectUser) {
    next();
  } else {
    res.status(401).send("Invalid Credentials");
  }
};
