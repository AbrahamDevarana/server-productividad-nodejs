const Sequelize = require('sequelize');
const slugify = require('slugify')
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
    lider_id: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    slug: Sequelize.STRING,
    area_id: Sequelize.INTEGER,
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
        beforeUpdate: (departamento) => {
            departamento.updatedAt = new Date();
        },
        beforeCreate: (departamento) => {
            departamento.slug = slugify(departamento.nombre, {lower: true});
        }
    }
})

Departamento.belongsTo(Area, {foreignKey: 'area_id'});

module.exports = Departamento;