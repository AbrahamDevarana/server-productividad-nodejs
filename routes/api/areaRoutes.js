const router = require('express').Router();
const { check } = require('express-validator');
const areasController = require('../../controller/AreasController');

router.get('/', areasController.getAreas);
router.get('/:id', areasController.getArea);


router.post('/',
    //validaciones
    [
        check('nombre').not().isEmpty().withMessage('El nombre es requerido').trim(),
        check('descripcion').not().isEmpty().withMessage('La descripcion es requerida'),
    ],
    areasController.createArea    
)

router.put('/update',
    //validaciones
    [
        check('id').not().isEmpty().withMessage('El id es requerido'),
        check('nombre').not().isEmpty().withMessage('El nombre es requerido').trim(),
        check('descripcion').not().isEmpty().withMessage('La descripcion es requerida'),
    ],
    areasController.updateArea
)

router.delete('/delete',
    //validaciones
    [
        check('id').not().isEmpty().withMessage('El id es requerido'),
    ],
    areasController.deleteArea
)

module.exports = router;
