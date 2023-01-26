const Sequelize = require('sequelize');
const db = require('../config/db');
const Perspectiva = require('./Perspectiva');

const Objetivos = db.define('objetivos', {
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
                msg: 'El nombre del objetivo es requerido'
            }
        }
    },
    descripcion: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'La descripción del objetivo es requerida'
            }
        }
    },
    estatus_id: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    },

    inicio_periodo: {
        type: Sequelize.DATE,
        allowNull: true
    },
    fin_periodo: {
        type: Sequelize.DATE,
        allowNull: true
    },
    perspectiva_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'La perspectiva es requerida'
            }
        }
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
}, { 
    paranoid: true,
    hooks: {
        beforeUpdate: (user) => {
            user.updatedAt = new Date();
        }
    }
});
    

module.exports = Objetivos;

