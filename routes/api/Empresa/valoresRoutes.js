const router = require('express').Router();
const { check } = require('express-validator');
const valoresController = require('../../../controller/Empresa/ValoresController');


router.get('/', valoresController.getValores);

router.post('/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),    
        check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
        // check('imagen', 'La imagen es obligatoria').not().isEmpty()
    ],
    valoresController.createValores
);

router.put('/:id',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
        // check('imagen', 'La imagen es obligatoria').not().isEmpty()
    ],
    valoresController.updateValores
);

router.delete('/:id',
    valoresController.deleteValores
);

module.exports = router;