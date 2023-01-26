const Sequelize = require('sequelize');
const db = require('../config/db');
const Estado = require('./Estado');

const Municipio = db.define('municipios', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    estado_id: Sequelize.INTEGER,
    clave: Sequelize.INTEGER,
    nombre: Sequelize.STRING,
    activo: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    }
}, { timestamps: false });


Municipio.belongsTo(Estado, {foreignKey: 'estado_id', as: 'estado'});

module.exports = Municipio;
