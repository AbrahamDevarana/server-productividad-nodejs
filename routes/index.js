const router = require('express').Router();

const googleAuth = require('./googleAuth');
const apiRoutes = require('./apiRoutes');

const requireJwtAuth = require('../middleware/requireJwtAuth');

router.use('/auth', googleAuth)
router.use('/api', apiRoutes)


module.exports = router;