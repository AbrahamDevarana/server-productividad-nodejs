const router = require('express').Router();
const passport = require('passport');
const jwt = require('../services/jwt');


router.get(
    '/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
)

router.get(
    '/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/',
        session: false
    }),
    (req, res) => {
        const accessToken = jwt.createAccessToken(req.user);
        const refreshToken = jwt.createRefreshToken(req.user);
        res.status(200).json({
            code: 200,
            accessToken,
            refreshToken
        });
    }
)

module.exports = router;