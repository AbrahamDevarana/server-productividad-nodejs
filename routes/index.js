const router = require('express').Router();

const googleAuth = require('./googleAuth');
const apiRoutes = require('./apiRoutes');
const regularAuth = require('./regularAuth');
const requireJwtAuth = require('../middleware/requireJwtAuth');

router.use('/auth', googleAuth)
router.use('/login', regularAuth)
router.use('/', requireJwtAuth, apiRoutes)


module.exports = router;