const Sequelize = require('sequelize');
const db = require('../../config/db');


const Responsponsabilidad  = db.define('dev-responsabilidades', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    nombre: {
        type: Sequelize.STRING,
        allowNull: false,
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
        beforeUpdate: (responsabilidad) => {
            responsabilidad.updatedAt = new Date();
        }
    }
})

module.exports = Responsponsabilidad;
