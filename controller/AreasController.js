const Area = require('../models/Area');
const { validationResult } = require('express-validator');

exports.createArea = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.mapped());
    }

    const {nombre, descripcion} = req.body;
    try {
        const area = await Area.create({
            nombre,
            descripcion,
        });

        res.json({
            area,
            msg: 'Area añadida',
        })

    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

exports.updateArea = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.mapped());
    }

    const {id, nombre, descripcion} = req.body;

    const area = await Area.findOne({ where: { id } });
    if (area) {
        await area.update({
            nombre,
            descripcion,
        });

        res.json({
            area,
            msg: 'Area actualizada',
        })
    }
    else {
        return res.status(400).json({ msg: 'La area no existe' });
    }

}

exports.deleteArea = async(req, res) => {

    const { id } = req.params;

    const area = await Area.findOne({ where: { id } });
    if (area) {
        await area.destroy();
        res.json({
            area,
            msg: 'Area eliminada',
        })
    }
    else {
        return res.status(400).json({ msg: 'La area no existe' });
    }

}

exports.getAreas = async(req, res) => {

    const areas = await Area.findAll();

    res.json({
        areas,
        msg: 'Areas obtenidas',
    })

}

exports.getArea = async(req, res) => {

    const { id } = req.params;

    const area = await Area.findOne({ where: { id } });
    if (area) {
        res.json({
            area,
            msg: 'Area obtenida',
        })
    }
    else {
        return res.status(400).json({ msg: 'La area no existe' });
    }
}


