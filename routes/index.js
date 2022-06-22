const router = require('express').Router();

const apiRoutes = require('./apiRoutes');
const googleAuth = require('./googleAuth');
const regularAuth = require('./regularAuth');
const requireJwtAuth = require('../middleware/requireJwtAuth');

router.use('/auth', googleAuth)
router.use('/login', regularAuth)
router.use('/', requireJwtAuth, apiRoutes)


module.exports = router;