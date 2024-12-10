const mongoose = require('mongoose');
const task = require('./task');

const Schema = mongoose.Schema;

const userSchema = Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, minlength: 6 },
    tasks: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Task' }]
});

module.exports = mongoose.model('User', userSchema);