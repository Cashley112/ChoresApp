const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Task = require('./tasks')

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    assignedTasks: [
        {
            type: Schema.Types.ObjectId,
            ref: "Task"
        }
    ]
})

module.exports = mongoose.model('User', UserSchema);