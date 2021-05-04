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

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.render('home');
})
app.get('/users', async (req, res) => {
    const users = await User.find({})
    res.render('User/users', { users });
})
app.get('/users/new', (req, res) => {
    res.render('User/new');
})
app.post('/users', async (req, res) => {
    const user = new User(req.body.user);
    await user.save();
    res.redirect('/users')
})
app.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    const tasks = await Task.find({});
    const user = await User.findById(id).populate('assignedTasks');
    res.render('User/show', { user, tasks });
})
app.patch('/users/:id', async (req, res) => {
    const { id, taskId } = req.params;
    const user = await User.findById(id);
    const task = await Task.findOne(req.body);
    user.assignedTasks.push(task);
    await user.save();
    res.redirect(`/users/${ user._id }`)
})
app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.redirect('/users')
});

app.get('/tasks', async (req, res) => {
    const tasks = await Task.find({});
    res.render('Task/tasks', { tasks });
})
app.get('/tasks/new', (req, res) => {
    res.render('Task/new');
})
app.post('/tasks', async (req, res) => {
    task = new Task(req.body.task);
    await task.save();
    res.redirect(`/tasks/${ task._id }`)
})
app.get('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    res.render('Task/show', { task })
})
app.get('/tasks/:id/edit', async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    res.render('Task/edit', { task });
})
app.put('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate(id, {...req.body.task});
    res.redirect(`/tasks/${ task._id }`);
})
app.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    res.redirect('/tasks');
})

app.get('/schedule', async (req, res) => {
    const assignments = await User.find({}).populate('assignedTasks');
    res.render('schedule', { assignments });
})
// Complete task route
app.patch('/users/:id/tasks/:taskId', async (req, res) => {
    const { id, taskId } = req.params;
    const updatedTask = await User.findByIdAndUpdate(id, { $pull: { assignedTasks: taskId } });
    res.redirect('/schedule')
})



app.listen(3000, () => {
    console.log('Listening on Port 3000 (>^.^)>');
})