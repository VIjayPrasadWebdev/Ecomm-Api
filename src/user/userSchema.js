import mongoose from "mongoose";

export let userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    match: [/.+\@.+\../, "Please enter valid mail Address"],
  },
  password: {
    type: String,
    // validate: {
    //   validator: function (value) {
    //     return /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{3,12}$/.test(value);
    //   },
    //   message:
    //     "Password should be between 8-12 charachetrs and have a special character",
    // },
  },

  type: { type: String, enum: ["Customer", "Admin"] },
});
