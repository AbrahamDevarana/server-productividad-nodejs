const router = require('express').Router();
const { check } = require('express-validator');
const areasController = require('../../controller/AreasController');

router.get('/', areasController.getAreas);
router.get('/:id', areasController.getArea);


router.post('/',
    [
        check('nombre').not().isEmpty().withMessage('El nombre es requerido').trim(),
        check('descripcion').not().isEmpty().withMessage('La descripcion es requerida'),
    ],
    areasController.createArea    
)

router.put('/:id',
    [
        check('nombre').not().isEmpty().withMessage('El nombre es requerido').trim(),
        check('descripcion').not().isEmpty().withMessage('La descripcion es requerida'),
    ],
    areasController.updateArea
)

router.delete('/:id',
    areasController.deleteArea
)

module.exports = router;
