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
            choreScore: 0,
            profilePicture: 'https://images.unsplash.com/photo-1611774119019-461b5dbd3ae8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=375&q=80'
        },
        {
            username: 'ItallianStallion',
            password: 'red',
            email: 'rojo@gmail.com',
            choreScore: 0,
            profilePicture: 'https://images.unsplash.com/photo-1605993439219-9d09d2020fa5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80'
        },
        {
            username: 'DonCheadlesSon',
            password: 'green',
            email: 'verde@gmail.com',
            choreScore: 0,
            profilePicture: 'https://images.unsplash.com/photo-1512146587460-f94274cc6b9f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80'
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
    await seedDbUsers();
    await seedDbTasks();
    await seedDbMatch();
}

seedDbTotal().then(() => {
    mongoose.connection.close();
})

