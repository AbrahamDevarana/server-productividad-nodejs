const router = require('express').Router();
const { check } = require('express-validator');
const responsabilidadController = require('../../../controller/Empresa/ResponsabilidadController');

router.get('/', responsabilidadController.getResponsabilidad);

router.post('/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
        // check('imagen', 'La imagen es obligatoria').not().isEmpty()
    ],

        responsabilidadController.createResponsabilidad
);


router.put('/:id',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
        // check('imagen', 'La imagen es obligatoria').not().isEmpty()
    ],  
        responsabilidadController.updateResponsabilidad
);

router.delete('/:id',
    responsabilidadController.deleteResponsabilidad
);

module.exports = router;
