const jwt = require('../services/jwt')
const moment = require('moment')
const Users = require('../models/Users')

exports.getAccessToken = (req, res) =>  {
    if(req.user){
        const accessToken = jwt.createAccessToken(req.user)
        const refreshToken = jwt.createRefreshToken(req.user)
        res.status(200).json({ 
            accessToken,
            refreshToken
         })
    } else {
        res.status(401).json({ msg: 'Debes iniciar sesión primero' })
    }
}


function willExpireToken(token){
    const { expiresIn } = jwt.decodeToken(token)
    const currentDate = moment().unix()

    if(currentDate > expiresIn){
        return true
    }
    return false
}


exports.refreshAccessToken = async (req, res) =>{

    const {refreshToken} = req.body
    const isTokenExpired = willExpireToken(refreshToken)

    if(isTokenExpired){
        res.status(404).json({ msg: "El refreshToken ha expirado" })
    }else{
        const { id } = jwt.decodeToken(refreshToken)
        try {
            const user = await Users.findOne({ where: { id: id } })
            if(user){
                res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: moment().add(30, 'days').unix() })
                .cookie('accessToken', jwt.createAccessToken(user), { httpOnly: true, maxAge: moment().add(3, 'days').unix() })

                // res.status(200).json({
                //     accessToken: jwt.createAccessToken(user),
                //     refreshToken: refreshToken
                // })
            }else{
                res.status(404).json({ msg: "No se encontró el usuario" })
            }
        } catch (error) {
            res.status(500).json({ msg: "Error al obtener el usuario" })
            console.log(error);
        }

        
    }
    
}
