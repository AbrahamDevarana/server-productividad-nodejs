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


exports.verifyUser = async (req, res) => {
    const token = req.header('auth-token')
    if ( !token ) return res.status(401).json({ error:{ msg: "Accesso no autorizado"}})

    try {
        jwt.verify(token, process.env.JWT_SECRET, async (error, decoded) => {
            if (error) {
              return res.status(401).json({ msg: 'Token no valido' });
            } else {
                req.user = decoded;
                const user = await Users.findOne({ where: { id: req.user.id } })
                    if(!user) return res.status(401).json({ msg: 'Token inexistente' })
                res.json({
                    msg: 'Usuario autenticado',
                    user:{
                        id: user.id,
                        name: user.name,
                        lastName: user.lastName,
                        email: user.email,
                        short_name: user.short_name,
                        rol_id: user.rol_id,
                        birth_date: user.birth_date,
                        admission_date: user.admission_date,
                        active: user.active,
                        google_id: user.google_id,
                        phone: user.phone,
                        secondLastName: user.secondLastName,
                        profile_description: user.profile_description,
                        social_linkedin: user.social_linkedin,
                        social_facebook: user.social_facebook,
                        social_twitter: user.social_twitter,
                        social_instagram: user.social_instagram                        
                    }
                });
            }
        })
    } catch (error) {
        res.status(400).json({ error: {msg: 'Token no valido' } })
    }

}