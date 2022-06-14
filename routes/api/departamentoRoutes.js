const router = require('express').Router();
const { check } = require('express-validator');
const departamentoController = require('../../controller/DepartamentosController');


router.get('/', departamentoController.getDepartamentos);
router.get('/:id', departamentoController.getDepartamento);

router.post('/',
    
    [
        check('nombre').not().isEmpty().withMessage('El nombre es requerido').trim(),
        check('descripcion').not().isEmpty().withMessage('La descripcion es requerida'),
        check('area_id').not().isEmpty().withMessage('El area_id es requerido'),
    ],

    departamentoController.createDepartamento
)

router.put('/:id',
    [
        check('nombre').not().isEmpty().withMessage('El nombre es requerido').trim(),
        check('descripcion').not().isEmpty().withMessage('La descripcion es requerida'),
        check('area_id').not().isEmpty().withMessage('El area_id es requerido'),
    ],
    departamentoController.updateDepartamento
)

router.delete('/:id',
    departamentoController.deleteDepartamento
)