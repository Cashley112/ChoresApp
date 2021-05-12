const mongoose = require('mongoose');
const User = require('./models/users')
const Task = require('./models/tasks');
const Assignment = require('./models/assignments');

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
            username: 'Cashley112',
            password: 'blue',
            email: 'azul@gmail.com',
            choreScore: 0,
            profilePicture: 'https://t4.ftcdn.net/jpg/04/10/43/77/360_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg'
        },
        {
            username: 'ItallianStallion',
            password: 'red',
            email: 'rojo@gmail.com',
            choreScore: 0,
            profilePicture: 'https://t4.ftcdn.net/jpg/04/10/43/77/360_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg'
        },
        {
            username: 'DonCheadlesSon',
            password: 'green',
            email: 'verde@gmail.com',
            choreScore: 0,
            profilePicture: 'https://t4.ftcdn.net/jpg/04/10/43/77/360_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg'
        }
    ])
    // await newUser.save()
};



seedDbTasks = async () => {
    await Task.deleteMany({});
    await Task.insertMany([
        {
            title: 'Clean Kitchen',
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, voluptates? Illo non amet quasi, excepturi quia nihil vero ullam illum beatae laboriosam explicabo eveniet autem quo quibusdam maiores inventore reiciendis.",
            category: 'indoor'
        },
        {
            title: 'Take Out Trash',
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, voluptates? Illo non amet quasi, excepturi quia nihil vero ullam illum beatae laboriosam explicabo eveniet autem quo quibusdam maiores inventore reiciendis.",
            category: 'utility'
        },
        {
            title: 'Mow Lawn',
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, voluptates? Illo non amet quasi, excepturi quia nihil vero ullam illum beatae laboriosam explicabo eveniet autem quo quibusdam maiores inventore reiciendis.",
            category: ['outdoor', 'utility']
        },
        {
            title: 'Pay Electric',
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, voluptates? Illo non amet quasi, excepturi quia nihil vero ullam illum beatae laboriosam explicabo eveniet autem quo quibusdam maiores inventore reiciendis.",
            category: 'money'
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
    await Assignment.deleteMany({});
    await seedDbUsers();
    await seedDbTasks();
    await seedDbMatch();
}

seedDbTotal().then(() => {
    mongoose.connection.close();
})

