const router = require('express').Router();
const passport = require('passport');
const isUserAuthenticated = require('../middleware/loginWithGoogle');
const jwt = require('../services/jwt');
require('dotenv').config({ path: '.env' });


router.get(
    '/google',
    passport.authenticate('google', {
        scope: ['email', 'profile']
    })
)

router.get(
    '/google/callback',
    passport.authenticate('google', {
        failureMessage: 'Error al iniciar sesión, porfavor intenta más tarde',
        failureRedirect: process.env.CLIENT_URL + '/error',
        successRedirect: process.env.CLIENT_URL + '/success',
    }),
    (req, res) => {

        console.log('req.user', req.user);
       
        res.status(200).json({ msg: 'Has iniciado sesión correctamente' })
    })

router.get('/validate', isUserAuthenticated,
    (req, res) => {
        if(req.user){
            const accessToken = jwt.createAccessToken(req.user);
            const refreshToken = jwt.createRefreshToken(req.user);
            res.status(200).json({ 
                accessToken,
                refreshToken
            });
        }else{
            res.status(401).json({ msg: 'Debes iniciar sesión primero' })
        }
    }
)

router.get('/logout', isUserAuthenticated, (req, res) => {
   req.session.destroy();
})


module.exports = router;