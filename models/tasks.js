const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    // frequency - how many times task needs to be completed per month
    frequency: {
        type: Number,
        enum: [1,2,3,4]
    }
});

module.exports = mongoose.model('Task', TaskSchema);