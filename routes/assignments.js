const express = require('express');
const router = express.Router({ mergeParams: true });

const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');

const Task = require('../models/tasks');
const User = require('../models/users');
const Assignment = require('../models/assignments');

router.get('/', catchAsync(async (req, res) => {
    const assignments = await Assignment.find({}).populate('username').populate('task');
    const usersArray = [];
    for (let i = 0; i < assignments.length; i++) {
        let dict = {};
        dict['username'] = assignments[i].username[0].username;
        dict['user_id'] = assignments[i].username[0]._id
        dict['task'] = assignments[i].task[0].title;
        dict['task_id'] = assignments[i].task[0]._id;
        dict['time'] = String(assignments[i].assignedAt);
        dict['assignment_id'] = assignments[i]._id;
        usersArray.push(dict);
    }
    // console.log(usersArray[0]);
    res.render('schedule', { usersArray });
}));

module.exports = router;