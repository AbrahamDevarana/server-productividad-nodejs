const router = require('express').Router();
const { check } = require('express-validator');
const corporativoController = require('../../../controller/Empresa/CorporativoController');

router.get('/', corporativoController.getCorporativo);

router.put('/', 
    corporativoController.updateCorporativo
);

module.exports = router;