const router = require('express').Router();
const passport = require('passport');
const {check} = require('express-validator');

const authController = require('../controller/authController');

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