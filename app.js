const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const path = require('path');
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');

const User = require('./models/users');
const Assignment = require('./models/assignments');

const users = require('./routes/users');
const tasks = require('./routes/tasks');
const assignments = require('./routes/assignments');

mongoose.connect('mongodb://localhost:27017/chores-app', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.use('/users', users);
app.use('/tasks', tasks);
app.use('/assignments', assignments);

app.get('/', catchAsync(async (req, res) => {
    const users = await User.find({});
    res.render('home', { users });
}));

// Complete task route
// must REFACTOR to include only assignmentID in req.params, then populate to include user and task properties
app.patch('/users/:id/tasks/:taskId/assignments/:assignmentId', catchAsync(async (req, res) => {
    const { id, taskId, assignmentId } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, { $pull: { assignedTasks: taskId }, $push: { choreHistory: taskId }, $inc : { choreScore: 1 } });
    await Assignment.findByIdAndDelete(assignmentId);
    res.redirect('/assignments')
}));

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Oh No, something went wrong";
    res.status(statusCode).render('error', { err })
})

app.listen(3000, () => {
    console.log('Listening on Port 3000 (>^.^)>');
})