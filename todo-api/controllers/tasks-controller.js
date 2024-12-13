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
//
tasks.forEach(task => console.log(task.toObject({ getters: true })));

//

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

const createTask = async (req, res, next) => {
    const { title, description, completed, creator } = req.body;

    const createdTask = new Task({
        title,
        description,
        completed,
        creator
    });

    let user;
    try {
        user = await User.findById(creator);
    } catch (err) {
        const error = new HttpError('Creating task failed, please try again.', 500);
        return next(error);
    }

    if (!user) {
        const error = new HttpError('Could not find user for provided id.', 404);
        return next(error);
    }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdTask.save({ session: sess });
        user.tasks.push(createdTask);
        await user.save({ session: sess });
        await sess.commitTransaction();
    } catch (err) {
        const error = new HttpError('Creating task failed, please try again.', 500);
        return next(error);
    }

    res.status(201).json({ task: createdTask });
}

const updateTask = async (req, res, next) => {
    const { title, description, completed, creator } = req.body;
    const taskId = req.params.tid;

    let task;
    try {
        task = await Task.findById(taskId);
        
    }catch (err) {
        const error = new HttpError('Could not find task.', 500);
        return next(error);
    } 
    if (task.creator._id.toString() !== creator) {
        const error = new HttpError('You are not allowed to edit this task.', 401);
        return next(error);
    }

    task.title = title;
    task.description = description;
    task.completed = completed;

    try { 
        await task.save();
    } catch (err) {
        const error = new HttpError('Could not update task.', 500);
        return next(error);
    }
    res.status(200).json({ task: task.toObject({ getters: true }) });
}

const deleteTask = async (req, res, next) => {
    const taskId = req.params.tid;
    const creatorId = req.body.creator;

    let task;
    try {
        task = await Task.findById(taskId).populate('creator');
    } catch (err) {
        const error = new HttpError('Could not find task to delete.', 500);
        return next(error);
    }
    if (task.creator.id !== creatorId) {
        const error = new HttpError('You are not allowed to delete this task.', 401);
        return next(error);
    }
    try {
        const sess = await mongoose.startSession();
        await sess.startTransaction();
        await task.deleteOne({ session: sess });
        task.creator.tasks.pull(task);
        await task.creator.save({ session: sess });
        await sess.commitTransaction();
    } catch (err) {
        console.error('Error during transaction:', err);
        const error = new HttpError('Could not delete task.', 500);
        return next(error);
    }   
    res.status(200).json({ message: 'Task deleted.' });
};

exports.getTasks = getTasks;
exports.getTasksByUserId = getTasksByUserId;
exports.createTask = createTask;
exports.updateTask = updateTask;
exports.deleteTask = deleteTask;