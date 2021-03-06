const { validationResult } = require('express-validator');
const Competencias = require('../../models/Empresa/Competencias');
const Corporativo = require('../../models/Empresa/Corporativo');
const Responsponsabilidad = require('../../models/Empresa/Responsabilidad');
const Valores = require('../../models/Empresa/Valores');
exports.getCorporativo = async (req, res) => {

    try {
        const corporativo = await Corporativo.findOne({ where: { id: 1 }, include: [Valores, Competencias, Responsponsabilidad] });
        res.status(200).json({
            msg: 'Cororporativo encontrado',
            corporativo,
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Server error', error });
    }
    
}

exports.updateCorporativo = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { proposito, mision, vision, logotipo, isotipo, politica_responsabilidad } = req.body;

    console.log(req.body);
    try {
        let corporativo = await Corporativo.findOne({ where: { id: 1 }, include: [Valores, Competencias] });
        // Actualizar usuario
        if (corporativo) {
            corporativo.proposito = proposito? proposito : corporativo.proposito;
            corporativo.mision = mision? mision : corporativo.mision;
            corporativo.vision = vision? vision : corporativo.vision;
            corporativo.logotipo = logotipo? logotipo : corporativo.logotipo;
            corporativo.isotipo = isotipo? isotipo : corporativo.isotipo;
            corporativo.politica_responsabilidad = politica_responsabilidad ? politica_responsabilidad : corporativo.politica_responsabilidad;
            await corporativo.save();
            res.status(200).json({
                msg: 'Corporativo actualizado',
                corporativo,
            })
        } else {
            return res.status(400).json({ msg: 'El corporativo no existe' });
        }

    } catch (err) {
        res.status(500).json({ msg: 'Server error' , err});
    }
}
