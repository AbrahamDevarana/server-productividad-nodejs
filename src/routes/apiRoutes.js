const router = require('express').Router();

//Modelos
const userRoutes = require('./api/userRoutes');
const perspectivaRoutes = require('./api/perspectivaRoutes');
const objetivoRoutes = require('./api/objetivoRoutes');
const areaRoutes = require('./api/areaRoutes');
const departamentoRoutes = require('./api/departamentoRoutes');
const locationRoutes = require('./api/locationRoutes');
const puestoRoutes = require('./api/puestoRoutes');

//Corporativos
const corporativoRoutes = require('./api/Empresa/corporativoRoutes');
const competenciasRoutes = require('./api/Empresa/competenciasRoutes');
const responsabilidadRoutes = require('./api/Empresa/responsabilidadRoutes');
const valoresRoutes = require('./api/Empresa/valoresRoutes');

//TODO: Agregar Middleware



router.use('/user', userRoutes)
router.use('/perspectiva', perspectivaRoutes);
router.use('/objetivo', objetivoRoutes);
router.use('/area', areaRoutes);
router.use('/departamento', departamentoRoutes);
router.use('/location', locationRoutes);
router.use('/puesto', puestoRoutes);



router.use('/corporativo', corporativoRoutes)
router.use('/corporativo/competencias', competenciasRoutes)
router.use('/corporativo/responsabilidad', responsabilidadRoutes)
router.use('/corporativo/valores', valoresRoutes)



module.exports = router;