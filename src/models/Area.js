const Sequelize = require('sequelize');
const slugify = require('slugify')
const db = require('../config/db');

const Area = db.define('areas', {
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
                msg: 'El nombre de la área es requerido'
            }
        }
    },
    descripcion: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'La descripción de la área es requerida'
            }
        }
    },
    slug: Sequelize.STRING,
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
            beforeUpdate: (area) => {
                area.updatedAt = new Date();
            },
            beforeCreate: (area) => {
                area.slug = slugify(area.nombre, {lower: true});
            }
        }
});

module.exports = Area;