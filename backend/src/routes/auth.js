const router = require('express').Router();
const authenticateToken = require('../middleware/auth');
const {register, login} = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);

module.exports = router;