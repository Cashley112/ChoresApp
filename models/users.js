const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Task = require('./tasks')

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    assignedTasks: [
        {
            type: Schema.Types.ObjectId,
            ref: "Task",
            assignedAt: {
                type: Date,
                default: Date.now()
            }
        }
    ],
    choreScore: {
        type: Number,
        default: 0
    },
    profilePicture: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', UserSchema);