const router = require('express').Router();

//Modelos
const userRoutes = require('./api/userRoutes');
const perspectivaRoutes = require('./api/perspectivaRoutes');
const objetivoRoutes = require('./api/objetivoRoutes');



//TODO: Agregar Middleware
router.use('/user', userRoutes)
router.use('/perspectiva', perspectivaRoutes);
router.use('/objetivo', objetivoRoutes);

module.exports = router;