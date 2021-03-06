const Users = require('../models/Users');
const { validationResult } = require('express-validator');
const moment = require('moment')

exports.createUser = async(req, res) => {
    
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.mapped());
    }
    const { name, email, lastName, secondLastName, birth_date, admission_date, phone, profile_description, street, 
        suburb, bachelor_degree, birth_place, rol_id, position_id, department_id, town_id, isLeader} = req.body;
    try {

        let user = await Users.findOne({ where:{email} });
        
        if (user) {
            return res.status(400).json({ msg: 'Este usuario ya existe' });
        }
        user = await Users.create({
            name,
            email,
            lastName,
            secondLastName,
            birth_date: moment(birth_date, 'DD-MM-YYYY').format('YYYY-MM-DD'),
            admission_date: moment(admission_date, 'DD-MM-YYYY').format('YYYY-MM-DD'),
            phone,
            profile_description,
            street,
            suburb,
            bachelor_degree,
            birth_place,
            rol_id,
            position_id,
            department_id,
            town_id,
        })


        res.status(200).json({
            msg: 'Usuario creado',
            user
        })
        
    } catch (err) {
        res.status(500).json({ msg: 'Server error', err });
        console.log(err)
    }
};

exports.updateUser = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.mapped());
    }

    const { id, name, email, lastName, birth_date, admission_date, phone, active, secondLastName, nick_name, profile_description, social_facebook,
        social_twitter, social_instagram, social_linkedin, street, suburb, bachelor_degree, birth_place, rol_id, position_id, department_id, town_id } = req.body;
    
    try {
        let user = await Users.findOne({ where:{id} });
        // Actualizar usuario
        if(user){
            user.name = name;
            user.email = email;
            user.lastName = lastName;
            user.secondLastName = secondLastName;
            user.nick_name = nick_name;
            user.birth_date = birth_date;
            user.admission_date = admission_date;
            user.phone = phone;
            user.active = active;
            user.profile_description = profile_description;
            user.social_facebook = social_facebook;
            user.social_twitter = social_twitter;
            user.social_instagram = social_instagram;
            user.social_linkedin = social_linkedin;
            user.street = street, 
            user.suburb = suburb, 
            user.bachelor_degree = bachelor_degree, 
            user.birth_place = birth_place, 
            user.rol_id = rol_id, 
            user.position_id = position_id, 
            user.department_id = department_id, 
            user.town_id = town_id,
            await user.save();

            res.status(200).json({
                msg: 'Usuario actualizado',
                user
            })
        }else{
            return res.status(404).json({ msg: 'El usuario no existe' });
        }

        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('[UserC] Server error');
    }
};

exports.deleteUser = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.mapped());
    }

    const { email } = req.body;
    
    try {
        let user = await Users.findOne({ email });
        // Eliminar usuario
        if(user){
            await user.destroy()

            res.status(200).json({
                msg: 'Usuario eliminado',
                user
            })
        }else{
            return res.status(400).json({ msg: 'El usuario no existe o ya ha sido desactivado' });
        }

        
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
}

exports.getUsers = async(req, res) => {
    try {
        const users = await Users.findAll({ include : [ 'position' ] });

        if(!users){
            res.status(400).json({ msg: 'No hay usuarios registrados' });
        }else{
            res.status(200).json(users);
        }
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
}

exports.getUser = async(req, res) => {

    if(!req.params.id){
        return res.status(400).json({ msg: 'El id del usuario es necesario' });
    }

    try {
        const user = await Users.findOne( { where: { id: req.params.id }, attributes : {exclude: ['password']}, include: ['responsabilidades', 'position', 'department', 'town'] });
        if(!user){
            res.status(400).json({ msg: 'El usuario no existe' });
        }else{
            res.status(200).json(user);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
}

exports.searchUser = async(req, res) => {
    if(!req.params.slug){
        return res.status(400).json({ msg: 'El slug del usuario es necesario' });
    }

    try {
        const user = await Users.findOne( { where: { slug: req.params.slug }, attributes : {exclude: ['password']}, include: ['responsabilidades', 'position', 'department', 'town'] });
        if(!user){
            res.status(400).json({ msg: 'El usuario no existe' });
        }else{
            res.status(200).json(user);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
}