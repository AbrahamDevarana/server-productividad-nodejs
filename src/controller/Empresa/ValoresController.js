const Valores = require('../../models/Empresa/Valores');
const { validationResult } = require('express-validator');

exports.getValores = async (req, res) => {
    try {
        const valores = await Valores.findAll();
        res.status(200).json({
            msg: 'Valores encontrados',
            valores,
        })
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
}

exports.updateValores = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {id} = req.params;
    const { nombre, descripcion, imagen } = req.body;
    try {
        let valores = await Valores.findOne({ where: { id } });
        // Actualizar usuario
        if (valores) {
            valores.nombre = nombre,
            valores.descripcion = descripcion,
            valores.imagen = imagen,
            await valores.save();
            res.status(200).json({
                msg: 'Valores actualizados',
                valores,
            })
        } else {
            return res.status(400).json({ msg: 'Los valores no existen' });
        }

    } catch (err) {
        res.status(500).json({ msg: 'Server error' });;
    }
}

exports.deleteValores = async (req, res) => {
    const {id} = req.params;
    try {
        let valores = await Valores.findOne({ where: { id } });
        // Actualizar usuario
        if (valores) {
            await valores.destroy();
            res.status(200).json({
                msg: 'Valor eliminados',
                valores,
            })
        } else {
            return res.status(400).json({ msg: 'El valor no existe' });
        }

    } catch (err) {
        res.status(500).json({ msg: 'Server error' });;
    }
}

exports.createValores = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { nombre, descripcion, imagen } = req.body;
    try {
        const valores = await Valores.create({
            nombre,
            descripcion,
            imagen,
        });
        res.status(200).json({
            msg: 'Valor creados',
            valores,
        })
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
}