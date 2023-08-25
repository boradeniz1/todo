const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Todo = require('../models/todoModel'); // Import the model correctly


// Get all ToDo items
router.get('/', (req, res) => {
  Todo.find({ user: req.user.id })
    .sort({ creationDate: 'descending' })
    .then(todos => {
      res.json(todos);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// Add new ToDo item
router.post('/', (req, res) => {
  const newTodo = new Todo({
    title: req.body.title,
    details: req.body.details,
    user: req.user.id,
    dueDate: req.body.dueDate
  });

  newTodo
    .save()
    .then(todo => {
      res.status(201).json(todo);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// Edit ToDo item
router.put('/:id', (req, res) => {
  Todo.findOne({ _id: req.params.id })
    .then(todo => {
      todo.title = req.body.title;
      todo.details = req.body.details;
      todo.dueDate = req.body.dueDate;

      todo
        .save()
        .then(updatedTodo => {
          res.json(updatedTodo);
        })
        .catch(err => {
          res.status(500).json({ error: err.message });
        });
    })
    .catch(err => {
      res.status(404).json({ error: 'Todo not found' });
    });
});

// Remove ToDo item
router.delete('/:id', (req, res) => {
  Todo.findOneAndRemove({ _id: req.params.id })
    .then(() => {
      res.sendStatus(204);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
