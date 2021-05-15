const express = require('express');
const router = express.Router({ mergeParams: true });

const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');

const Task = require('../models/tasks');
const User = require('../models/users');
const Assignment = require('../models/assignments');

router.get('/', catchAsync(async (req, res) => {
    const tasks = await Task.find({});
    res.render('Task/tasks', { tasks });
}));
router.get('/new', catchAsync(async (req, res) => {
    const tasks = await Task.find({});
    res.render('Task/new', { tasks });
}));
router.post('/', catchAsync(async (req, res) => {
    task = new Task(req.body.task);
    await task.save();
    res.redirect(`/tasks/${ task._id }`)
}));
router.get('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    res.render('Task/show', { task })
}));
router.get('/:id/edit', catchAsync(async (req, res) => {
    const { id } = req.params;
    const tasks = await Task.find({});
    const task = await Task.findById(id);
    res.render('Task/edit', { task, tasks });
}));
router.put('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate(id, {...req.body.task});
    res.redirect(`/tasks/${ task._id }`);
}));
router.delete('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    res.redirect('/tasks');
}));

module.exports = router;