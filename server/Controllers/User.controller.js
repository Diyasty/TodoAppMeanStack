const User = require("../models/Auth.model");
const Todo = require("../models/Todo.model");
const Token = require("../helpers/Token");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const login = await User.login(email, password);
    const token = Token.CreateToken(login);
    res.header("Authorization", "Bearer " + token);
    res.json({ user: login, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const register = async (req, res) => {
  try {
    const user = await User.register(req.body.email, req.body.password);
    // create a new user
    const save = await user.save();

    const token = Token.CreateToken(user);
    res.header("Authorization", "Bearer " + token);
    res.json({ _id: save._id, email: save.email });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  login,
  register,
};
