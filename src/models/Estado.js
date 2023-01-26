const Sequelize = require('sequelize');
const db = require('../config/db');

const Estado = db.define('estados', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    clave: Sequelize.INTEGER,
    nombre: Sequelize.STRING,
    abrev: Sequelize.STRING,
    activo: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    }
}, { timestamps: false });

module.exports = Estado;
