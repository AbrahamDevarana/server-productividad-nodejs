const Sequelize = require('sequelize');
const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Users = db.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El nombre es requerido'
            }
        }
    },
    lastName:{
        type: Sequelize.STRING,
        allowNull: true,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El apellido es requerido'
            }
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: 'El correo es requerido'
            }
        }
    },
    short_name: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    active: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    google_id: Sequelize.STRING,
    rol_id: Sequelize.INTEGER,
    birth_date: {
        type: Sequelize.DATE,
        allowNull: true
    },
    admission_date: {
        type: Sequelize.DATE,
        allowNull: true
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: true
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
    
}, { 
    paranoid: true,
    hooks: {
        beforeUpdate: (user) => {
                user.updatedAt = new Date();
            },
        beforeCreate: (user) => {
            user.short_name = `${user.name} ${user.lastName}`.normalize('NFD')
            .replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,"$1")
            .normalize().concat(' ').replace(/([a-zA-Z]{0,} )/g, function(match){ return (match.trim()[0])}); 

            user.password = bcrypt.hashSync("Devarana#1234*", bcrypt.genSaltSync(10));
            }
    },
    defaultScope: {
        attributes: {
        //   exclude: ['createdAt', 'updatedAt']
        }
    }
    },
);

Users.prototype.generateJWT = function() {
    const token = jwt.sign({
        id: this.id,
        name: this.name,
        email: this.email,
        short_name: this.short_name,
        expiresIn: '48h',
    }, process.env.JWT_SECRET,
    )
    return token;
}


module.exports = Users;