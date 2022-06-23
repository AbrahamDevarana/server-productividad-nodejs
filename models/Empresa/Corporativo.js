const Sequelize = require('sequelize');
const db = require('../../config/db');
const Competencias = require('./Competencias');
const Responsponsabilidad = require('./Responsabilidad');
const Valores = require('./Valores');

const Corporativo = db.define('corporativo', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    proposito: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    mision: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    vision: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    logotipo: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    isotipo: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    fortaleza: {
        type: Sequelize.TEXT,
    },
    oportunidades:{
        type: Sequelize.TEXT,
    },
    debilidades: {
        type: Sequelize.TEXT,
    },
    amenazas: {
        type: Sequelize.TEXT,
    }
}, {
    paranoid: true,
    hooks: {
        beforeUpdate: (corporativo) => {
            corporativo.updatedAt = new Date();
        }
    }
})


Corporativo.hasMany(Valores, {
    foreignKey: 'corporativo_id'
})

Corporativo.hasMany(Competencias, {
    foreignKey: 'corporativo_id'
})
Corporativo.hasMany(Responsponsabilidad, {
    foreignKey: 'corporativo_id'
})
module.exports = Corporativo;


