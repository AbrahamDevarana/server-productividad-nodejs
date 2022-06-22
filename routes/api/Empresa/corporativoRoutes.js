const router = require('express').Router();
const { check } = require('express-validator');
const corporativoController = require('../../../controller/Empresa/CorporativoController');

router.get('/', corporativoController.getCorporativo);

router.put('/', 
    [
        check('proposito', 'El proposito es obligatorio').not().isEmpty(),
        check('mision', 'La mision es obligatoria').not().isEmpty(),
        check('vision', 'La vision es obligatoria').not().isEmpty(),
        check('logotipo', 'El logotipo es obligatorio').not().isEmpty(),
        check('isotipo', 'El isotipo es obligatorio').not().isEmpty(),
        check('fortaleza', 'La fortaleza es obligatoria').not().isEmpty(),
        check('oportunidades', 'Las oportunidades son obligatorias').not().isEmpty(),
        check('debilidades', 'Las debilidades son obligatorias').not().isEmpty(),
        check('amenazas', 'Las amenazas son obligatorias').not().isEmpty()
    ],
        corporativoController.updateCorporativo
);

module.exports = router;