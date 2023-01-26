const router = require('express').Router();
const { check } = require('express-validator');
const puestoController = require('../../controller/PuestosController');

router.post('/',
    //Validaciones
    [
        check('nombre').not().isEmpty().withMessage('El nombre es requerido').trim(),
        check('descripcion').not().isEmpty().withMessage('La descripcion es requerida'),
    ],
    puestoController.createPuesto
);

router.put('/:id',
    //validaciones
    [
        check('nombre').not().isEmpty().withMessage('El nombre es requerido').trim(),
        check('descripcion').not().isEmpty().withMessage('La descripcion es requerida'),
        check('estatus_id').not().isEmpty().withMessage('El area es requerido'),
        
    ],
    puestoController.updatePuesto
)

router.delete('/:id',
    puestoController.deletePuesto
)

router.get('/', puestoController.getPuestos);
router.get('/:id', puestoController.getPuesto);

module.exports = router;