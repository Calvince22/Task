const knex = require('../db');
const {hashPassword, comparePassword, generateToken} = require('../utils/auth');

const register = async (req, res) => {
    try {
    const {email, password} = req.body;

    //Check if user already exists
    const existingUser = await knex('users').where({email}).first();
    if (existingUser) {
        return res.status(400).json({message: 'User already exists'});
    }

    const hashedPassword = await hashPassword(password);
    
    const [user] = await knex('users')
        .insert({email, password: hashedPassword})
        .returning(['id', 'email', 'role']);

    const token = generateToken(user.id);
    res.status(201).json({token});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
}

const login = async (req, res) => {
     console.log('req.body:', req.body);
    try {
        const {email, password} = req.body;

        const user = await knex('users').where({email}).first();
        if (!user) {
            return res.status(400).json({message: 'Invalid credentials'});
        }

        const isMatch = await comparePassword(password, user.password);     
        if (!isMatch) {
            return res.status(400).json({message: 'Invalid credentials'});
        }

        const token = generateToken(user);
        res.json({token});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
}

module.exports = {
    register,
    login
};
