const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Task = require('./tasks')
const User = require('./users')

// JUST SIMPLY TRYING TO KEEP TRACK OF DATES TASKS WERE ASSIGNED
const AssignmentSchema = new Schema({
    username: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    task: [
        {
            type: Schema.Types.ObjectId,
            ref: "Task"
        }
    ],
    assignedAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Assignment', AssignmentSchema);