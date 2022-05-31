const router = require('express').Router();
const {check} = require('express-validator');
const userController = require('../../controller/UserController');

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

router.put('/update',
    ///Validaciones
    [
        check('id').not().isEmpty().withMessage('El id es requerido'),
        check('name').not().isEmpty().withMessage('El nombre es requerido').trim(),
        check('email').isEmail().withMessage('El correo es requerido').normalizeEmail(),
        check('lastName').not().isEmpty().withMessage('El apellido es requerido'),
    ],
    userController.updateUser
)

router.delete('/delete',
    ///Validaciones
    [
        check('id').not().isEmpty().withMessage('El id es requerido'),
    ],
    userController.deleteUser
)

router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);

module.exports = router;
   