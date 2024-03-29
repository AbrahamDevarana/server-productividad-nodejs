const router = require('express').Router();
const passport = require('passport');
const isUserAuthenticated = require('../middleware/loginWithGoogle');
const authController = require('../controller/AuthController')
const jwt = require('../services/jwt')
const moment = require('moment')
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
        // successRedirect: process.env.CLIENT_URL + '/',
    }),
    (req, res) => {
        // cookie expira 1 semana            
        // res.cookie('refreshToken', jwt.createRefreshToken(req.user), { httpOnly: true, maxAge: moment().add(30, 'days').unix(), sameSite: 'lax', secure: true })
        // .cookie('accessToken', jwt.createAccessToken(req.user), { httpOnly: true, maxAge: moment().add(3, 'days').unix(), sameSite: 'lax', secure: true })
        res.redirect(process.env.CLIENT_URL + '/')
        
    })

router.get('/validate', isUserAuthenticated, authController.getAccessToken)

router.post('/refresh-access-token', authController.refreshAccessToken)

router.get('/logout', (req, res) => {
    res.clearCookie('productividad-session');
    req.session.destroy(null);
    req.session = '';
    res.status(200).json({ msg: 'Has cerrado sesión correctamente' })

})


module.exports = router;