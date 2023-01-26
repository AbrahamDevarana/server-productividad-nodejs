const Sequelize = require('sequelize');
const slugify = require('slugify')
const db = require('../../config/db');

const Valores = db.define('valores', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    nombre: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    descripcion: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    imagen: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    corporativo_id: Sequelize.INTEGER
}, {
    paranoid: true,
    hooks: {
        beforeUpdate: (valores) => {
            valores.updatedAt = new Date();
        }
    }
})

module.exports = Valores;