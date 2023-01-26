const Objetivos = require('../models/Objetivos');
const {validationResult} = require('express-validator');

exports.createObjetivo = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { nombre, descripcion, estatus_id, perspectiva_id } = req.body;
    try {
        
        const objetivo = await Objetivos.create({
            nombre,
            descripcion,
            estatus_id,
            perspectiva_id
        });

        res.status(200).json({
            msg: 'Objetivo creado',
            objetivo,
        })

    } catch (err) {
        res.status(500).json({ msg: 'Server error' });;
    }
}

exports.updateObjetivo = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id, nombre, descripcion, estatus_id, perspectiva_id, inicio_periodo, fin_periodo } = req.body;
    try {
        let objetivo = await Objetivos.findOne({ where: { id } });
        // Actualizar usuario
        if (objetivo) {
            objetivo.nombre = nombre;
            objetivo.descripcion = descripcion;
            objetivo.estatus_id = estatus_id;
            objetivo.perspectiva_id = perspectiva_id;
            objetivo.inicio_periodo = inicio_periodo;
            objetivo.fin_periodo = fin_periodo;
            await objetivo.save();
            res.status(200).json({
                msg: 'Objetivo actualizado',
                objetivo,
            })
        } else {
            return res.status(400).json({ msg: 'El objetivo no existe' });
        }

    } catch (err) {
        res.status(500).json({ msg: 'Server error' });;
    }
}

exports.deleteObjetivo = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.body;
    try {
        let objetivo = await Objetivos.findOne({ where: { id } });
        // Actualizar usuario
        if (objetivo) {
            await objetivo.destroy();
            res.status(200).json({
                msg: 'Objetivo eliminado',
                objetivo,
            })
        } else {
            return res.status(400).json({ msg: 'El objetivo no existe' });
        }

    } catch (err) {
        res.status(500).json({ msg: 'Server error' });;
    }
}

exports.getObjetivos = async(req, res) => {
    try {
        const objetivos = await Objetivos.findAll();

        if (!objetivos) {
            return res.status(400).json({ msg: 'No hay objetivos registrados' });
        }else{
            res.status(200).json({
                objetivos,
            })
        }
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });;
    }
}

exports.getObjetivo = async(req, res) => {
    try {
        const { id } = req.params;
        const objetivo = await Objetivos.findOne({ where: { id } });

        if (!objetivo) {
            return res.status(400).json({ msg: 'El objetivo no existe' });
        }else{
            res.status(200).json({
                objetivo,
            })
        }
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });;
    }
}