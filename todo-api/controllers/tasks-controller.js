const mongoose = require('mongoose');
const HttpError = require('../models/http-error');
const User = require('../models/user');
const Task = require('../models/task');


const getTasks = async (req, res, next) => {

    let tasks;
    try {
        tasks = await Task.find();
    } catch (err) {
        const error = new HttpError('Fetching tasks failed, please try again later.', 500);
        return next(error);
    }
    res.json({ tasks: tasks.map(task => task.toObject({ getters: true })) });
};

const getTasksByUserId = async (req, res, next) => {
    console.log('getTasksByUserId');
    const userId = req.params.uid;

    let tasks;
    try {
        tasks = await Task.find({ creator: userId });
    } catch (err) {
        const error = new HttpError('Fetching tasks failed, please try again later.', 500);
        return next(error);
    }

    if (!tasks || tasks.length === 0) {
        return next(new HttpError('Could not find tasks for the provided user id.', 404));
    }

    res.json({ tasks: tasks.map(task => task.toObject({ getters: true })) });
};

exports.getTasks = getTasks;
exports.getTasksByUserId = getTasksByUserId;

