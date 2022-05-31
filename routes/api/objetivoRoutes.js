const router = require('express').Router();
const { check } = require('express-validator');
const objetivoController = require('../../controller/ObjetivosController');

router.get('/', objetivoController.getObjetivos);
router.get('/:id', objetivoController.getObjetivo);

router.post('/',
    //validaciones
    [
        check('nombre').not().isEmpty().withMessage('El nombre es requerido').trim(),
        check('descripcion').not().isEmpty().withMessage('La descripcion es requerida'),
        check('perspectiva_id').not().isEmpty().withMessage('La perspectiva es requerida'),
        check('estatus_id').not().isEmpty().withMessage('El estado es requerido'),
        check('inicio_periodo').not().isEmpty().withMessage('La fecha de inicio es requerida'),
        check('fin_periodo').not().isEmpty().withMessage('La fecha de fin es requerida'),
    ],
    objetivoController.createObjetivo
)

router.put('/update',
    //validaciones
    [
        check('id').not().isEmpty().withMessage('El id es requerido'),
        check('nombre').not().isEmpty().withMessage('El nombre es requerido').trim(),
        check('descripcion').not().isEmpty().withMessage('La descripcion es requerida'),
        check('perspectiva_id').not().isEmpty().withMessage('La perspectiva es requerida'),
        check('estatus_id').not().isEmpty().withMessage('El estado es requerido'),
        check('inicio_periodo').not().isEmpty().withMessage('La fecha de inicio es requerida'),
        check('fin_periodo').not().isEmpty().withMessage('La fecha de fin es requerida'),
    ],
    objetivoController.updateObjetivo
)

router.delete('/delete',
    //validaciones
    [
        check('id').not().isEmpty().withMessage('El id es requerido'),
    ],
    objetivoController.deleteObjetivo
)

module.exports = router;