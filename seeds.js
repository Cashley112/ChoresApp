const mongoose = require('mongoose');
const User = require('./models/users')
const Task = require('./models/tasks');

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

// const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDbUsers = async () => {
    await User.deleteMany({});
    // const newUser = new User({
    //     username: 'Cashley112'
    // })
    await User.insertMany([
        {
            username: 'Cashley112'
        },
        {
            username: 'ItallianStallion'
        },
        {
            username: 'DonCheadlesSon'
        }
    ])
    // await newUser.save()
};



seedDbTasks = async () => {
    await Task.deleteMany({});
    await Task.insertMany([
        {
            title: 'Clean Kitchen'
        },
        {
            title: 'Take Out Trash'
        },
        {
            title: 'Mow Lawn'
        }
    ])
};



seedDbMatch = async () => {
    const tasks = await Task.find({});
    const users = await User.find({});
    for (let i = 0; i < users.length; i++) {
        users[i].assignedTasks.push(tasks[i]);
        await users[i].save();
    }
}

seedDbTotal = async () => {
    await seedDbUsers();
    await seedDbTasks();
    await seedDbMatch();
}

seedDbTotal().then(() => {
    mongoose.connection.close();
})

