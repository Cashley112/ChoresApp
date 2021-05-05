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
            username: 'Cashley112',
            password: 'blue',
            email: 'azul@gmail.com',
            choreScore: 0
        },
        {
            username: 'ItallianStallion',
            password: 'red',
            email: 'rojo@gmail.com',
            choreScore: 0
        },
        {
            username: 'DonCheadlesSon',
            password: 'green',
            email: 'verde@gmail.com',
            choreScore: 0
        }
    ])
    // await newUser.save()
};



seedDbTasks = async () => {
    await Task.deleteMany({});
    await Task.insertMany([
        {
            title: 'Clean Kitchen',
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, voluptates? Illo non amet quasi, excepturi quia nihil vero ullam illum beatae laboriosam explicabo eveniet autem quo quibusdam maiores inventore reiciendis."
        },
        {
            title: 'Take Out Trash',
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, voluptates? Illo non amet quasi, excepturi quia nihil vero ullam illum beatae laboriosam explicabo eveniet autem quo quibusdam maiores inventore reiciendis."
        },
        {
            title: 'Mow Lawn',
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, voluptates? Illo non amet quasi, excepturi quia nihil vero ullam illum beatae laboriosam explicabo eveniet autem quo quibusdam maiores inventore reiciendis."
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

