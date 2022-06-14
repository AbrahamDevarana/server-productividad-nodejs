const Sequelize = require('sequelize');
const db = require('../config/db');
const Area = require('./Area');


const Departamento = db.define('departamentos', {
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
                msg: 'El nombre del departamento es requerido'
            }
        }
    },
    descripcion: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'La descripción del departamento es requerida'
            }
        }
    },
    area_id: Sequelize.INTEGER,
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
            beforeUpdate: (departamento) => {
                departamento.updatedAt = new Date();
            }
    }
})

Departamento.belongsTo(Area, {foreignKey: 'area_id'});

module.exports = Departamento;