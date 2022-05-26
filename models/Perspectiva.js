const Sequelize = require('sequelize');
const db = require('../config/db');
const Objetivos = require('./Objetivos');

const Perspectiva = db.define('perspectivas', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    nombre: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El nombre de la perspectiva es requerido'
            }
        }
    },
    descripcion: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'La descripción de la perspectiva es requerida'
            }
        }
    },
    estatus_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },

}, {paranoid: true},
    {
        hooks: {
            beforeUpdate: (user) => {
                user.updatedAt = new Date();
            },
        },
    }
);

Perspectiva.hasMany(Objetivos, {
    foreignKey: 'perspectiva_id',
});

module.exports = Perspectiva;