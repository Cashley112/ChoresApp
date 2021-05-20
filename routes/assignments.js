const express = require('express');
const router = express.Router({ mergeParams: true });

const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');

const Task = require('../models/tasks');
const User = require('../models/users');
const Assignment = require('../models/assignments');

router.get('/', catchAsync(async (req, res) => {
    const usersArray = await Assignment.findMapAndPush();
    console.log(usersArray);
    res.render('schedule', { usersArray });
}));

module.exports = router;