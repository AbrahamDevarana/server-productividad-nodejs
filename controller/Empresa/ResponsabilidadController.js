const Responsabilidad = require('../../models/Empresa/Responsabilidad');
const { validationResult } = require('express-validator');


exports.getResponsabilidad = async (req, res) => {
    
        try {
            const responsabilidad = await Responsabilidad.findAll();
            res.status(200).json({
                msg: 'Responsabilidad encontrada',
                responsabilidad,
            })
    
        } catch (error) {
            res.status(500).json({ msg: 'Server error' });
        }
    
    }

exports.updateResponsabilidad = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {id} = req.params;
    const { nombre, descripcion, imagen } = req.body;
    try {
        let responsabilidad = await Responsabilidad.findOne({ where: { id } });
        // Actualizar usuario
        if (responsabilidad) {
            responsabilidad.nombre = nombre,
            responsabilidad.descripcion = descripcion,
            responsabilidad.imagen = imagen,
            await responsabilidad.save();
            res.status(200).json({
                msg: 'Responsabilidad actualizada',
                responsabilidad,
            })
        } else {
            return res.status(400).json({ msg: 'La responsabilidad no existe' });
        }

    } catch (err) {
        res.status(500).json({ msg: 'Server error' });;
    }
}

exports.deleteResponsabilidad = async (req, res) => {
    const {id} = req.params;
    try {
        let responsabilidad = await Responsabilidad.findOne({ where: { id } });
        // Actualizar usuario
        if (responsabilidad) {
            await responsabilidad.destroy();
            res.status(200).json({
                msg: 'Responsabilidad eliminada',
                responsabilidad,
            })
        } else {
            return res.status(400).json({ msg: 'La responsabilidad no existe' });
        }

    } catch (err) {
        res.status(500).json({ msg: 'Server error' });;
    }
}

exports.createResponsabilidad = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { nombre, descripcion, imagen } = req.body;
    try {
        let responsabilidad = await Responsabilidad.create({
            nombre,
            descripcion,
            imagen,
        });
        // Actualizar usuario
        if (responsabilidad) {
            res.status(200).json({
                msg: 'Responsabilidad creada',
                responsabilidad,
            })
        } else {
            return res.status(400).json({ msg: 'La responsabilidad no existe' });
        }

    } catch (err) {
        res.status(500).json({ msg: 'Server error' });;
    }
}
