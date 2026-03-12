const knex = require('../db');

const createTask = async (req, res) => {
    try {
        const {title, description} = req.body;
        const userId = req.user.id;

        const [task] = await knex('tasks')
            .insert({title, description, user_id: userId})
            .returning('*');

        res.status(201).json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
};

const getTasks = async (req, res) => {
    try {
        const userId = req.user.id;
        const tasks = await knex('tasks').where({user_id: userId});
        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
};

const updateTask = async (req, res) => {
    try{
        const {id} = req.params;
        const {title, description, status} = req.body;
        const userId = req.user.id;

        const task = await knex('tasks').where({id, user_id: userId}).first();
        if (!task) {
            return res.status(404).json({message: 'Task not found'});
        }

        const [updatedTask] = await knex('tasks')
            .where({id})
            .update({ title, description, status, updated_at: new Date() })
            .returning('*');

        res.json(updatedTask);      
    }
    catch (error) {
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }   
};

const deleteTask = async (req, res) => {
    try {
        const {id} = req.params;
        const userId = req.user.id;

        const task = await knex('tasks').where({id, user_id: userId}).first();
        if (!task) {
            return res.status(404).json({message: 'Task not found'});
        }

        await knex('tasks').where({id}).del();
        res.json({message: 'Task deleted'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }           

}

module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask
};  