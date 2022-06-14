const Departamento = require('../models/Departamento');
const { validationResult } = require('express-validator');
const Area = require('../models/Area');

exports.createDepartamento = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.mapped());
    }
    const {nombre, descripcion, area_id} = req.body;

    
    try {
        const area = await Area.findOne({ where: { id_area } });

        if(!area) {
            return res.status(400).json({ msg: 'La area no existe o o no esta disponible' });
        }

        const departamento = await Departamento.create({
            nombre,
            descripcion,
            area_id,
        });
        
        res.status(200).json({
            departamento,
            msg: 'Departamento añadido',
        })

    }
    catch (err) {
        
        res.status(500).json({ msg: 'Server error' });
    }
}

exports.updateDepartamento = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.mapped());
    }
    
    const {nombre, descripcion, area_id} = req.body;
    const { id } = req.params;
    
    try {
        const departamento = await Departamento.findOne({ where: { id } });
        if (departamento) {
            await departamento.update({
                nombre,
                descripcion,
                area_id,
            });
        }
        else {
            return res.status(400).json({ msg: 'El departamento no existe' });
        }
        res.status(200).json({
            departamento,
            msg: 'Departamento actualizado',
        })
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });

    }

}

exports.deleteDepartamento = async(req, res) => {
    const { id } = req.params;
    try {
        const departamento = await Departamento.findOne({ where: { id } });
        if (departamento) {
            await departamento.destroy();
        }
        else {
            return res.status(400).json({ msg: 'El departamento no existe' });
        }
        res.status(200).json({
            msg: 'Departamento eliminado',
            departamento,
        })
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });

    }
}

exports.getDepartamentos = async(req, res) => {
    try {
        const departamentos = await Departamento.findAll();
        res.status(200).json({
            departamentos,
            msg: 'Departamentos obtenidos',
        })
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });

    }
}

exports.getDepartamento = async(req, res) => {
    const { id } = req.params;
    try {
        const departamento = await Departamento.findOne({ where: { id } });
        if (departamento) {
            res.status(200).json({
                departamento,
                msg: 'Departamento obtenido',
            })
        }
        else {
            return res.status(400).json({ msg: 'El departamento no existe' });
        }
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });

    }
}
