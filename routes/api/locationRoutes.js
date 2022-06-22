const router = require('express').Router();
const locationController = require('../../controller/LocationController');


router.get('/', locationController.getEstados);
router.get('/:estado_id', locationController.getMunicipios);


module.exports = router;