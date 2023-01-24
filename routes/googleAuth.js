const router = require('express').Router();
const passport = require('passport');
const isUserAuthenticated = require('../middleware/loginWithGoogle');
const authController = require('../controller/AuthController');

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
        res.redirect(process.env.CLIENT_URL + '/')      

    })

router.get('/validate', isUserAuthenticated, authController.getAccessToken)

router.post('/refresh-access-token', authController.refreshAccessToken)

router.post('/logout', (req, res, next) => {


    req.session.destroy(null)
    req.session = ''
    req.user = ''

    res.clearCookie('connect.sid', '', { 
        path: '/',
        cookie: {
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax', // must be 'none' to enable cross-site delivery
            secure: process.env.NODE_ENV === "production", // must be true if sameSite='none'
            maxAge: -1,
            expires: -1,

        }

    })
    // res.clearCookie('connect.sid', { path: '/' })

    res.status(200).json({ message: 'Sesión cerrada' })

})


module.exports = router;