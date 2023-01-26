const { validationResult } = require('express-validator');
const Competencias = require('../../models/Empresa/Competencias');


exports.getCompetencias = async (req, res) => {
    
        try {
            const competencias = await Competencias.findAll();
            res.status(200).json({
                msg: 'Competencias encontradas',
                competencias,
            })
    
        } catch (error) {
            res.status(500).json({ msg: 'Server error' });
        }
    
}

exports.updateCompetencias = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {id} = req.params;
    const { nombre, descripcion, imagen } = req.body;
    try {
        let competencia = await Competencias.findOne({ where: { id } });
        // Actualizar usuario
        if (competencia) {

            competencia.nombre = nombre,
            competencia.descripcion = descripcion,
            competencia.imagen = imagen,
            await competencia.save();
            res.status(200).json({
                msg: 'Competencias actualizadas',
                competencia,
            })
        } else {
            return res.status(400).json({ msg: 'La competencia no existe' });
        }

    } catch (err) {
        res.status(500).json({ msg: 'Server error' });;
    }
}

exports.deleteCompetencias = async (req, res) => {
    const { id } = req.params;
    try {
        let competencia = await Competencias.findOne({ where: { id } });
        // Actualizar usuario
        if (competencia) {
            await competencia.destroy();
            res.status(200).json({
                msg: 'Competencias eliminadas',
                competencia,
            })
        } else {
            return res.status(400).json({ msg: 'La competencia no existe' });
        }

    } catch (err) {
        res.status(500).json({ msg: 'Server error' });;
    }
}

exports.createCompetencias = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { nombre, descripcion, imagen } = req.body;
    try {
        let competencia = await Competencias.create({
            nombre,
            descripcion,
            imagen,
        });
        res.status(200).json({
            msg: 'Competencias creadas',
            competencia,
        })

    } catch (err) {
        res.status(500).json({ msg: 'Server error' });;
    }
}