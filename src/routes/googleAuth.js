const router = require('express').Router();
const passport = require('passport');
require('dotenv').config({ path: '.env' });


router.get(
    '/',
    passport.authenticate('google', {
        scope: ['email', 'profile']
    })
)

router.get(
    '/callback',
    passport.authenticate('google', {
        failureMessage: 'Error al iniciar sesión, porfavor intenta más tarde',
        failureRedirect: process.env.CLIENT_URL + '/error',
        // successRedirect: process.env.CLIENT_URL + '/',
    }),
    (req, res) => {
        res.redirect(process.env.CLIENT_URL + '/')      

    })

module.exports = router;