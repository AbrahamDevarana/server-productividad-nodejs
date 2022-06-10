const jwt = require('jsonwebtoken');
const moment = require('moment');
const JWT_SECRET = process.env.JWT_SECRET;
require ('dotenv').config();


exports.createAccessToken = (user) => {
    const payload = {
        id: user.id,
        name:user.name,
        lastName:user.lastName,
        secondLastName:user.secondLastName,
        email:user.email,
        short_name:user.short_name,
        nick_name: user.nick_name,
        expiresIn: moment().add(3, 'days').unix(),
    }
    return jwt.sign(payload, JWT_SECRET);
}

exports.createRefreshToken = (user) => {
    const payload = {
        id: user.id,
        expiresIn: moment().add(30, 'days').unix(),
    }
    return jwt.sign(payload, JWT_SECRET);
}

exports.decodeToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
}


            