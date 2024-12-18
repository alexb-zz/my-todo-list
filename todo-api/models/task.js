const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    completed:{type: Boolean, required: true},
    creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
});

module.exports = mongoose.model('Task', taskSchema);