const bycrpt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Salt_Rounds = 10;

function hashPassword(password) {
    return bycrpt.hash(password, Salt_Rounds);
}

function comparePassword(password, hash) {
    return bycrpt.compare(password, hash);
}

const generateToken = (user) => {
    const payload = {
        id: user.id,
        email: user.email,
        role: user.role
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
}

module.exports = {
    hashPassword,
    comparePassword,
    generateToken
};