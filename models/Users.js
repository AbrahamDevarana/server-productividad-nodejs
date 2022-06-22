const Sequelize = require('sequelize');
const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const slugify = require('slugify')
const { nanoid } = require('nanoid');
const Responsabilidad = require('./Responsabilidad');

const Users = db.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El nombre es requerido'
            }
        }
    },
    lastName:{
        type: Sequelize.STRING,
        allowNull: true,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El apellido es requerido'
            }
        }
    },
    secondLastName:{
        type: Sequelize.STRING,
        allowNull: true,
    },
    nick_name:{
        type: Sequelize.STRING,
        allowNull: true,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: 'El correo es requerido'
            }
        }
    },
    short_name: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    active: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    birth_date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
        defaultValue: '1990-01-01',
    },
    admission_date: {
        type: Sequelize.DATEONLY,
        allowNull: true
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: true
    },
    profile_description: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    google_id: Sequelize.STRING,
    slug: Sequelize.STRING,
    social_facebook: {
        type: Sequelize.STRING,
        allowNull:true
    },
    social_linkedin: {
        type: Sequelize.STRING,
        allowNull:true
    },
    social_twitter: {
        type: Sequelize.STRING,
        allowNull:true
    },
    social_instagram: {
        type: Sequelize.STRING,
        allowNull:true
    },
    street:{
        type: Sequelize.STRING,
        allowNull:true
    },
    suburb:{
        type: Sequelize.STRING,
        allowNull:true
    },
    bachelor_degree:{
        type: Sequelize.STRING,
        allowNull:true
    },
    birth_place:{
        type: Sequelize.STRING,
        allowNull:true
    },
    picture: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    rol_id: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    position_id: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    department_id: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    town_id: Sequelize.INTEGER,
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
    
}, { 
    paranoid: true,
    hooks: {
    beforeUpdate: (user) => {
            user.updatedAt = new Date();
        },
    beforeCreate: (user) => {
        user.short_name = `${user.name} ${user.lastName} ${user.secondLastName}`.normalize('NFD')
        .replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,"$1")
        .normalize().concat(' ').replace(/([a-zA-Z]{0,} )/g, function(match){ return (match.trim()[0])}); 

        user.password = bcrypt.hashSync("Devarana#1234*", bcrypt.genSaltSync(10));

        user.slug = slugify(`${user.name} ${user.lastName} ${nanoid(6)}`, {lower: true, replacement: '_'});
         
        },
    },
    defaultScope: {
        attributes: {
        //   exclude: ['password']
        }
    }
    },
);


Users.prototype.generateJWT = function() {
    const token = jwt.sign({
        id: this.id,
        name:this.name,
        lastName:this.lastName,
        secondLastName:this.secondLastName,
        email:this.email,
        short_name:this.short_name,
        expiresIn: '48h',
        nick_name: this.nick_name
    }, process.env.JWT_SECRET,
    )
    return token;
}

// Relaciones
Users.hasMany(Responsabilidad, {foreignKey: 'user_id'});


module.exports = Users;