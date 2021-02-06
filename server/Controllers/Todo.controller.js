const mongoose = require("mongoose");

const TodoModel = require("../models/Todo.model");

/**
 * get all Todos
 * id :600f8e6eaf5bc4141cff6079
 */
const AllTodos = async (req, res) => {
  await TodoModel.find({}, (err, docs) => {
    if (err) {
      res.send(err);
    }
    return res.status(200).json(docs);
  });
};
/**
 *
 */

const userTodos = async (req, res) => {
  console.log(req.user);
  await TodoModel.find({ user: req.user.id }, (err, docs) => {
    if (err) {
      res.send(err);
    }
    return res.status(200).json(docs);
  });
};

/**
 *
 * Add Todo
 */
const AddTodo = async (req, res) => {
  const { title, description, user } = req.body;

  let newTodo = new TodoModel({
    title,
    description,
    user: mongoose.Types.ObjectId(user),
  });

  try {
    const save = await newTodo.save();
    res.send(save);
  } catch (e) {
    res.send(e);
  }
};

module.exports = {
  AllTodos,
  AddTodo,
  userTodos,
};
