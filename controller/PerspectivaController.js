const Perspectiva = require('../models/Perspectiva');
const {validationResult} = require('express-validator');
const Objetivos = require('../models/Objetivos');


exports.createPerspectiva = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { nombre, descripcion, estatus_id } = req.body;
    try {
        let perspectiva = await Perspectiva.findOne({ nombre });

        if (perspectiva) {
            return res.status(400).json({ msg: 'Esta perspectiva ya existe' });
        }

        perspectiva = new Perspectiva({
            nombre,
            descripcion,
            estatus_id
        });

        await perspectiva.save();

        res.status(200).json({
            msg: 'Perspectiva creada',
            perspectiva,
        })

    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
}

exports.updatePerspectiva = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id, nombre, descripcion, estatus_id } = req.body;
    try {
        let perspectiva = await Perspectiva.findOne({ where: { id } });
        // Actualizar usuario
        if (perspectiva) {
            perspectiva.nombre = nombre;
            perspectiva.descripcion = descripcion;
            perspectiva.estatus_id = estatus_id;
            await perspectiva.save();
            res.status(200).json({
                msg: 'Perspectiva actualizada',
                perspectiva,
            })
        } else {
            return res.status(400).json({ msg: 'La perspectiva no existe' });
        }
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
}

exports.getPerspectivas = async(req, res) => {
    try {
        const perspectivas = await Perspectiva.findAll({include: Objetivos });
        if (!perspectivas) {
            return res.status(400).json({ msg: 'No hay perspectivas' });
        }else{
            res.status(200).json({
                msg: 'Perspectivas obtenidas',
                perspectivas
            })
        }
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
}

exports.getPerspectiva = async(req, res) => {
    try {
        const { id } = req.params;
        const perspectiva = await Perspectiva.findOne({ where: { id }, include: Objetivos });

        if (!perspectiva) {
            return res.status(400).json({ msg: 'La perspectiva no existe' });
        }else{
            res.status(200).json({
                msg: 'Perspectiva obtenida',
                perspectiva
            })
        }

    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
}

exports.deletePerspectiva = async(req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { id } = req.body;
        const perspectiva = await Perspectiva.findOne({ where: { id } });
        if (perspectiva) {
            await perspectiva.destroy();
            res.status(200).json({
                msg: 'Perspectiva eliminada',
                perspectiva
            })
        } else {
            return res.status(400).json({ msg: 'La perspectiva no existe' });
        }
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
}



