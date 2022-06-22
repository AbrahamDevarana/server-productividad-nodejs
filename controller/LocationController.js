const db = require('../config/db');
const { QueryTypes } = require('sequelize');

exports.getEstados = async(req, res) => {
    try {
        const estados = await db.query(`SELECT * FROM estados`, { type: QueryTypes.SELECT });
        res.status(200).json({
            estados,
            msg: 'Estados obtenidos',
        })
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });

    }
}

exports.getMunicipios = async(req, res) => {

    const {estado_id} = req.params
    try {
        const municipios = await db.query(`SELECT * FROM municipios WHERE estado_id = ${estado_id}`, { type: QueryTypes.SELECT });
        if (municipios.length > 0) {
            res.status(200).json({
                municipios,
                msg: 'Municipios obtenidos',
            })
        }else{
            res.status(400).json({
                msg: 'No hay municipios para este estado',
            })
        }
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });

    }
}