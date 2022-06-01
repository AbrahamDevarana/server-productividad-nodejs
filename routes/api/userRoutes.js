const router = require('express').Router();
const {check} = require('express-validator');
const userController = require('../../controller/UserController');



// @route   POST api/user/register
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

// @route   PUT api/user/update
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

// @route   DELETE api/user/delete
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
   