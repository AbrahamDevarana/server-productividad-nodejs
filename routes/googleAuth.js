const router = require('express').Router();
const passport = require('passport');
const isUserAuthenticated = require('../middleware/loginWithGoogle');
const authController = require('../controller/AuthController')
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

router.get('/validate', isUserAuthenticated, authController.getAccessToken)

router.post('/refresh-access-token', authController.refreshAccessToken)

router.get('/logout', (req, res) => {
    res.clearCookie('express');
    req.session.destroy(null);
    req.session = '';
    res.status(200).json({ msg: 'Has cerrado sesión correctamente' })

})


module.exports = router;