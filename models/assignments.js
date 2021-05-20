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

AssignmentSchema.static('findMapAndPush', async function () {
    const assignments = await this.find({}).populate('username').populate('task');
    const usersArray = [];
    for (let i = 0; i < assignments.length; i++) {
        let dict = {};
        dict['username'] = assignments[i].username[0].username;
        dict['user_id'] = assignments[i].username[0]._id
        dict['task'] = assignments[i].task[0].title;
        dict['task_id'] = assignments[i].task[0]._id;
        dict['time'] = String(assignments[i].assignedAt);
        dict['assignment_id'] = assignments[i]._id;
        usersArray.push(dict);
    }
    return usersArray;
});

module.exports = mongoose.model('Assignment', AssignmentSchema);