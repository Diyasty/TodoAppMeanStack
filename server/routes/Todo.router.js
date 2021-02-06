const express = require("express");
const router = express.Router();

const token = require("../helpers/Token");

const {
  AllTodos,
  AddTodo,
  userTodos,
} = require("../Controllers/Todo.controller");

router.get("", token.VerifyToken, AllTodos);

router.post("/add", AddTodo);

router.get("/UserTodos", token.VerifyToken, userTodos);

module.exports = router;
