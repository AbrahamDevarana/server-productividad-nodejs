module.exports = isUserAuthenticated = async (req, res, next) => {    
    if(req.user){
        next()
    }else{
        res.status(401).json({ msg: 'Debes iniciar sesión primero' })
    }
}
