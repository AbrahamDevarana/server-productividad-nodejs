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

        res.json({
            msg: 'Perspectiva creada',
            perspectiva,
        })

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
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
            res.json({
                msg: 'Perspectiva actualizada',
                perspectiva,
            })
        } else {
            return res.status(400).json({ msg: 'La perspectiva no existe' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

exports.getPerspectivas = async(req, res) => {
    try {
        const perspectivas = await Perspectiva.findAll({include: Objetivos });
        if (!perspectivas) {
            return res.status(400).json({ msg: 'No hay perspectivas' });
        }else{
            res.json({
                msg: 'Perspectivas obtenidas',
                perspectivas
            })
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

exports.getPerspectiva = async(req, res) => {
    try {
        const { id } = req.params;
        const perspectiva = await Perspectiva.findOne({ where: { id }, include: Objetivos });

        if (!perspectiva) {
            return res.status(400).json({ msg: 'La perspectiva no existe' });
        }else{
            res.json({
                msg: 'Perspectiva obtenida',
                perspectiva
            })
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
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
            res.json({
                msg: 'Perspectiva eliminada',
                perspectiva
            })
        } else {
            return res.status(400).json({ msg: 'La perspectiva no existe' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}
