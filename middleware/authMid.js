const model = require('../models/index');
const jwt = require('jsonwebtoken');

const authMid = (req, res, next) => {
    try{
        const token = req.headers.authorization;
        if(!token) {
            res.status(401).json({
                message: 'Unauthorized',
            });
        }

        const user = jwt.verify(token, process.env.JWT_KEY);
        req.user = user;
        next();
        
    } catch (err) {
        res.status(401).json({
            message: 'Unauthorized',
        });
    }
}

const getUser = (req, res, next) => {
    try{
        const token = req.headers.authorization;
        if(token) {
            const user = jwt.verify(token, process.env.JWT_KEY);
            req.user = user;
        }
        next();
    } catch (err) {
        return res.status(500).end();
    }
}

module.exports = { authMid, getUser};