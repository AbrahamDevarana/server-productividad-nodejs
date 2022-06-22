const Puestos = require('../models/Puestos');
const { validationResult } = require('express-validator');

exports.createPuesto = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.mapped());
    }
    const { nombre, descripcion } = req.body;

    try {
        const puesto = await Puestos.create({
            nombre,
            descripcion,
        })

        res.status(200).json({
            puesto,
            msg: 'Puesto añadido',
        })
    }
    catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
}

exports.updatePuesto = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.mapped());
    }

    const { nombre, descripcion, estatus_id } = req.body;
    const { id } = req.params;

    try {
        const puesto = await Puestos.findOne({ where: { id } });
        if (puesto) {
            await puesto.update({
                nombre,
                descripcion,
                estatus_id
            });
        }
        else {
            return res.status(400).json({ msg: 'El puesto no existe' });
        }
    }
    catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
}

exports.deletePuesto = async(req, res) => {
    const { id } = req.params;

    try {
        const puesto = await Puestos.findOne({ where: { id } });
        if (puesto) {
            await puesto.destroy();
        }
        else {
            return res.status(400).json({ msg: 'El puesto no existe' });
        }
    }
    catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
}

exports.getPuestos = async(req, res) => {
    try {
        const puestos = await Puestos.findAll();
        res.status(200).json({
            puestos,
            msg: 'Puestos obtenidos',
        })
    }
    catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
}

exports.getPuesto = async(req, res) => {
    const { id } = req.params;

    try {
        const puesto = await Puestos.findOne({ where: { id } });
        if (puesto) {
            res.status(200).json({
                puesto,
                msg: 'Puesto obtenido',
            })
        }
        else {
            return res.status(400).json({ msg: 'El puesto no existe' });
        }
    }
    catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
}