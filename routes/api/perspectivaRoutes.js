const router = require('express').Router();
const { check } = require('express-validator');
const perspectivaController = require('../../controller/perspectivaController');

router.post('/',

    ///Validaciones
    [
        check('nombre').not().isEmpty().withMessage('El nombre es requerido').trim(),
        check('descripcion').not().isEmpty().withMessage('La descripcion es requerida'),
    ],
    perspectivaController.createPerspectiva
);

router.put('/update',
    //validaciones
    [   
        check('id').not().isEmpty().withMessage('El id es requerido'),
        check('nombre').not().isEmpty().withMessage('El nombre es requerido').trim(),
        check('descripcion').not().isEmpty().withMessage('La descripcion es requerida'),
        check('estatus_id').not().isEmpty().withMessage('El estado es requerido')
    ],
    perspectivaController.updatePerspectiva
)

router.delete('/delete', 
    [
        check('id').not().isEmpty().withMessage('El id es requerido')
    ],
    perspectivaController.deletePerspectiva
)

router.get('/', perspectivaController.getPerspectivas )
router.get('/:id', perspectivaController.getPerspectiva )


module.exports = router;