const Users = require('../models/Users');
const Responsabilidad = require('../models/Responsabilidad');
const { validationResult } = require('express-validator');


exports.createResponsabilidad = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.mapped());
    }
    const { descripcion, id } = req.body;  
    try {
        const user = await Users.findOne( { where: { id: id } });
        if (!user) {
            return res.status(400).json({ msg: 'El usuario no existe' });
        }

         const responsabilidad = await Responsabilidad.create({
            descripcion,
            user_id: id,
        });

        res.json({
            responsabilidad,
            msg: 'Responsabilidad añadida',
        })

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

exports.deleteResponsabilidad = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.mapped());
    }

    const { id } = req.params;
    try {
        const responsabilidad = await Responsabilidad.findOne({ where: { id } });
        if (responsabilidad) {
            await responsabilidad.destroy();
            res.json({
                responsabilidad,
                msg: 'Responsabilidad eliminada',
            })
        } else {
            return res.status(400).json({ msg: 'La responsabilidad no existe o ya fue eliminada' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}