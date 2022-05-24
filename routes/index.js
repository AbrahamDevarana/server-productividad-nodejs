const router = require('express').Router();

const googleAuth = require('./googleAuth');
const apiRoutes = require('./apiRoutes');


router.use('/auth', googleAuth)
router.use('/api', apiRoutes)


module.exports = router;