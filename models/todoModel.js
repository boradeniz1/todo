// models/todoModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uuid = require('uuid'); // Import the uuid package

const TodoSchema = new Schema({
  _id: { type: String, default: uuid.v4 },
  title: String,
  details: String,
  user: String,
  creationDate: { type: Date, default: Date.now },
  dueDate: String
});

module.exports = mongoose.model('Todo', TodoSchema); // Change 'todos' to 'Todo'
