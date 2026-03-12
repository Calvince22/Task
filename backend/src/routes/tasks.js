const router = require('express').Router();
const authenticateToken = require('../middleware/auth');
const {createTask, getTasks, updateTask, deleteTask} = require('../controllers/taskController');

router.use(authenticateToken);  

router.post('/', createTask);
router.get('/', getTasks);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;    