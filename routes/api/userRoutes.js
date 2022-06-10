const router = require('express').Router();
const {check} = require('express-validator');
const userController = require('../../controller/UserController');

const responsabilidadController = require('../../controller/ResponsabilidadController');


// @route   POST api/user/register
router.post('/',
    ///Validaciones
    [
        check('name').not().isEmpty().withMessage('El nombre es requerido').trim(),
        check('email').isEmail().withMessage('El correo es requerido').normalizeEmail(),
        check('lastName').not().isEmpty().withMessage('El apellido es requerido'),
        check('secondLastName').not().isEmpty().withMessage('El segundo apellido es requerido'),
        check('birth_date').not().isEmpty().withMessage('La fecha de nacimiento es requerida'),
        check('admission_date').not().isEmpty().withMessage('La fecha de ingreso es requerida'),
        check('phone').not().isEmpty().withMessage('El telefono es requerido'),
        check('street').not().isEmpty().withMessage('La calle es requerida'),
        check('suburb').not().isEmpty().withMessage('El barrio es requerido'),
        check('bachelor_degree').not().isEmpty().withMessage('El grado de estudios es requerido'),
        check('birth_place').not().isEmpty().withMessage('El lugar de nacimiento es requerido'),
        check('rol_id').not().isEmpty().withMessage('El rol es requerido'),
        check('position_id').not().isEmpty().withMessage('La posicion es requerida'),
        check('department_id').not().isEmpty().withMessage('El departamento es requerido'),
        check('town_id').not().isEmpty().withMessage('La ciudad es requerida'),

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
router.get('/find/:slug', userController.searchUser);


// Custom routes


router.post('/responsabilidad',
    ///Validaciones
    [
        check('descripcion').not().isEmpty().withMessage('El nombre es requerido').trim(),
    ],
    responsabilidadController.createResponsabilidad
);

router.delete('/responsabilidad/:id',
    responsabilidadController.deleteResponsabilidad
)



module.exports = router;
   