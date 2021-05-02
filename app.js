const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override')

const Task = require('./models/tasks')
const User = require('./models/users')

mongoose.connect('mongodb://localhost:27017/chores-app', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.render('home');
})
app.get('/users', async (req, res) => {
    const users = await User.find({})
    res.render('users', { users });
})

app.get('/tasks', async (req, res) => {
    const tasks = await Task.find({});
    res.render('tasks', { tasks });
})
app.get('/schedule', async (req, res) => {
    const assignments = await User.find({}).populate('assignedTasks');
    res.render('schedule', { assignments });
})

app.patch('/users/:id/tasks/:taskId', async (req, res) => {
    const { id, taskId } = req.params;
    const updatedTask = await User.findByIdAndUpdate(id, { $pull: { assignedTasks: taskId } });
    res.redirect('/schedule')
})



app.listen(3000, () => {
    console.log('Listening on Port 3000 (>^.^)>');
})