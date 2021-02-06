const express = require("express");
const router = express.Router();
const UserController = require("../Controllers/User.controller");
const User = require("../models/Auth.model");
const Token = require("../helpers/Token");

// Read the data of a user
router.post("/login", UserController.login);

// Create a new user
router.post("/register", UserController.register);

// // Update the data of a user in the db
// router.put("/update/:id", Token.VarifyToken, UserController.UpdateUser);

// // Delete a user from the db
// router.delete("/delete/:id", Token.VarifyToken, UserController.DeleteUser);

// // Get user posts
// router.get("/myposts/:id", UserController.myposts);

module.exports = router;
