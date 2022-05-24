const Sequelize = require('sequelize');
const db = require('../config/db');
const bcrypt = require('bcrypt-nodejs');

const Users = db.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    short_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    active: Sequelize.BOOLEAN,
}, {
    hooks: {
        beforeUpdate: (user) => {
                user.updatedAt = new Date();
            },
        beforeCreate: (user) => {
            user.password = bcrypt.hashSync(user.password);
            }
        }
    }
);

Users.prototype.generateJWT = function() {
    const token = jwt.sign({
        id: this.id,
        name: this.name,
        email: this.email,
        short_name: this.short_name,
        expiresIn: '12h',
    }, process.env.JWT_SECRET,
    )
    return token;
}


module.exports = Users;