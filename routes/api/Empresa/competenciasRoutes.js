const router = require('express').Router();
const { check } = require('express-validator');
const competenciasController = require('../../../controller/Empresa/CompetenciasController');

router.get('/', competenciasController.getCompetencias);
router.post('/', 
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
        // check('imagen', 'La imagen es obligatoria').not().isEmpty() 
    ], 
        competenciasController.createCompetencias
);
router.put('/:id', 
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
        // check('imagen', 'La imagen es obligatoria').not().isEmpty()
    ], 
        competenciasController.updateCompetencias
);
router.delete('/:id', 
    competenciasController.deleteCompetencias
);

module.exports = router;