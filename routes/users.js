const express = require('express');
const router = express.Router({ mergeParams: true });

const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');

const Task = require('../models/tasks');
const User = require('../models/users');
const Assignment = require('../models/assignments');

// potential bug
router.get('/', catchAsync(async (req, res) => {
    const users = await User.find({})
    res.render('User/users', { users });
}))
router.get('/new', (req, res) => {
    res.render('User/new');
})
router.post('/', async (req, res) => {
    const user = new User(req.body.user);
    await user.save();
    res.redirect('/users')
})
router.get('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const tasks = await Task.find({});
    const user = await User.findById(id).populate('assignedTasks');
    res.render('User/show', { user, tasks });
}));

// assign task to user route
router.patch('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    const task = await Task.findOne(req.body.task);
    user.assignedTasks.push(task);
    await user.save();
    const assignment = new Assignment({
        username: user,
        task: task
    });
    await assignment.save();
    console.log(assignment);
    res.redirect(`/users/${ user._id }`)
}));

router.delete('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.redirect('/users')
}));

module.exports = router;