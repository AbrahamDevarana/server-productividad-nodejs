const Sequelize = require('sequelize');
const db = require('../config/db');
const slugify = require('slugify');
const Users = require('./Users');

const Puestos = db.define('puestos', {
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
                msg: 'El nombre del puesto es requerido'
            }
        }
    },
    descripcion: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'La descripción del puesto es requerida'
            }
        }
    },
    slug: Sequelize.STRING,
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
    }
}, {
    paranoid: true,
    hooks: {
        beforeUpdate: (puestos) => {
            puestos.updatedAt = new Date();
        },
        beforeCreate: (puestos) => {
            puestos.slug = slugify(puestos.nombre, { lower: true })
        }
    }
})

Puestos.hasOne( Users , {
    foreignKey: 'position_id'
})

module.exports = Puestos;