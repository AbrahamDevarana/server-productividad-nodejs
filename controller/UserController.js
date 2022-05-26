const Users = require('../models/Users');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

exports.createUser = async(req, res) => {
    
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, lastName, birth_date, admission_date, phone } = req.body;

    const salt = bcrypt.genSalt(10);
    try {
        let user = await Users.findOne({ where:{email} });

        
        if (user) {
            return res.status(400).json({ msg: 'Este usuario ya existe' });
        }


        user = await Users.create({
            name,
            email,
            lastName,
            birth_date,
            admission_date,
            phone,
        })


        res.json({
            msg: 'Usuario creado',
            user
        })
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.updateUser = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id, name, email, lastName, birth_date, admission_date, phone, active } = req.body;
    
    try {
        let user = await Users.findOne({ id });
        // Actualizar usuario
        if(user){
            user.name = name;
            user.email = email;
            user.lastName = lastName;
            user.birth_date = birth_date;
            user.admission_date = admission_date;
            user.phone = phone;
            user.active = active;
            await user.save();

            res.json({
                msg: 'Usuario actualizado',
                user
            })
        }else{
            return res.status(400).json({ msg: 'El usuario no existe' });
        }

        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.deleteUser = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;
    
    try {
        let user = await Users.findOne({ email });
        // Eliminar usuario
        if(user){
            await user.destroy()

            res.json({
                msg: 'Usuario eliminado',
                user
            })
        }else{
            return res.status(400).json({ msg: 'El usuario no existe o ya ha sido desactivado' });
        }

        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

exports.getUsers = async(req, res) => {
    try {
        const users = await Users.findAll();

        if(!users){
            res.status(400).json({ msg: 'No hay usuarios registrados' });
        }else{
            res.json(users);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

exports.getUser = async(req, res) => {

    if(!req.params.id){
        return res.status(400).json({ msg: 'El id del usuario es necesario' });
    }

    try {
        const user = await Users.findOne( {where:{ id: req.params.id}});
        if(!user){
            res.status(400).json({ msg: 'El usuario no existe' });
        }else{
            res.json(user);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}