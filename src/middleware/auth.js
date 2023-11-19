const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

const auth = (req, res, next) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, 'Credibox*2023', (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

module.exports = auth;