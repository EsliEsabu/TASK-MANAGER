const jwt = require('jasonwebtoken');

const generateToken = (payload) => 
    jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '7b',
    });
    
const verifyToken = (token) => 
    jwt.verify(token, process.env.JWT_SECRET);

module.exports = { generateToken, verifyToken};