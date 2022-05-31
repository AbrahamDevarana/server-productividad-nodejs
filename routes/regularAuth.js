const router = require('express').Router();
const {check} = require('express-validator');

const authController = require('../controller/AuthController');

router.post('/',     
    [   // Validate fields
        check('email').isEmail(),
        check('password').isLength({min: 6})
    ],
authController.login);


router.get('/verifyUser',
    authController.verifyUser
);


module.exports = router;