const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

let AuthSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

// AuthSchema.pre("save", async function (n) {
//   let Auth = this;
//   await bcrypt.hash(Auth.password, 12).then((v) => {
//     Auth.password = v;
//     n();
//   });
// });

// static methods
AuthSchema.statics.login = async function (email, password) {
  //check for valid email and password
  // const { error } = validation({ email, password });

  // if (error) {
  //   throw new Error(error.details[0].message);
  // }

  try {
    //check if the user email exist or not
    const user = await this.findOne({
      email,
    }).select("-__v");
    //console.log(user);
    if (!user) {
      throw new Error("Wrong Email or Password.");
    }
    //check for a correct password
    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) {
      throw new Error("Wrong Email or Password.");
    }
    return {
      id: user._id,
      email: user.email,
    };
  } catch (err) {
    throw Error(err);
  }
};

AuthSchema.statics.register = async function (email, password) {
  //check for valid email and password
  // const { error } = validation({ email, password });
  // if (error) {
  //   console.log(eroor);
  //   throw new Error(error.details[0].message);
  // }

  try {
    //check if the user email exist or not
    const testUser = await this.findOne({
      email,
    }).select("-__v");
    if (testUser) {
      throw new Error("This email used before");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new this({
      email,
      password: hashedPassword,
    });
    return user;
  } catch (err) {
    throw Error(err);
  }
};

module.exports = mongoose.model("users", AuthSchema);
