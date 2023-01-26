const Sequelize = require('sequelize');
const db = require('../config/db');

const Responsabilidades = db.define('responsabilidades', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    descripcion: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'La descripcion es requerida'
            }
        }
    },

    user_id: {
        ref: 'Users',
        type: Sequelize.INTEGER,
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
    hooks:{
        beforeUpdate: (user) => {
            user.updatedAt = new Date();
        },
    }
})

module.exports = Responsabilidades;


