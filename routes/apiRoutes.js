const router = require('express').Router();

//Modelos
const userRoutes = require('./api/userRoutes');
const perspectivaRoutes = require('./api/perspectivaRoutes');
const objetivoRoutes = require('./api/objetivoRoutes');
const areaRoutes = require('./api/areaRoutes');



//TODO: Agregar Middleware
router.use('/user', userRoutes)
router.use('/perspectiva', perspectivaRoutes);
router.use('/objetivo', objetivoRoutes);
router.use('/area', areaRoutes);




module.exports = router;