const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

const authRoutes = require('./src/routes/auth');
const taskRoutes = require('./src/routes/tasks');

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

module.exports = {app  };