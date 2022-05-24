const router = require('express').Router();
const passport = require('passport');


router.get(
    '/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
)

router.get(
    '/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/login',
        session: false
    }),
    (req, res) => {
        const token = req.user.generateJWT()
        res.cookie('x-auth-cookie', token)
    }
)

module.exports = router;