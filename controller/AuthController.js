const Users = require('../models/Users');
const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json( errors.mapped() );
    }

    const { email, password } = req.body;

    try {
        let user = await Users.findOne({ where: {email} });

        if (!user) {
            return res.status(401).json( { msg: 'El usuario no existe' } );
        }

        const isMatch = await bcrypt.compareSync(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ msg: 'Contraseña incorrecta' });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        const token = user.generateJWT();

        res.json({
            msg: 'Usuario autenticado',
            token,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('[Auth Controller]: Server error');
    }
}

