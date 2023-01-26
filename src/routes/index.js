const router = require('express').Router();

const apiRoutes = require('./apiRoutes');
const googleAuth = require('./googleAuth');
const authRoutes = require('./authRoutes')
const requireJwtAuth = require('../middleware/requireJwtAuth');

router.use('/login', googleAuth)
router.use('/auth', authRoutes)
router.use('/', requireJwtAuth, apiRoutes)


module.exports = router;