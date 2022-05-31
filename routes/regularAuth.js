const router = require('express').Router();
const {check} = require('express-validator');

const authController = require('../controller/AuthController');
const userController = require('../controller/UserController');

router.post('/',     
    [   // Validate fields
        check('email').isEmail(),
        check('password').isLength({min: 6})
    ],
authController.login);


router.get('/verifyUser',
    authController.verifyUser
);


router.post('/register',
    ///Validaciones
    [
        check('name').not().isEmpty().withMessage('El nombre es requerido').trim(),
        check('email').isEmail().withMessage('El correo es requerido').normalizeEmail(),
        check('lastName').not().isEmpty().withMessage('El apellido es requerido'),
        check('secondLastName').not().isEmpty().withMessage('El segundo apellido es requerido'),
    ],
    userController.createUser
);

module.exports = router;