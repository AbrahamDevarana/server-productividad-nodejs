const router = require('express').Router();
const passport = require('passport');
const isUserAuthenticated = require('../middleware/loginWithGoogle');
const authController = require('../controller/AuthController');
require('dotenv').config({ path: '.env' });


router.get('/validate', isUserAuthenticated, authController.getAccessToken)

router.get(
    '/logout', 
    (req, res) => {
        res.clearCookie('connect.sid')
        req.session.destroy(null)
        req.session = ''
        res.status(200).json({ message: 'Has cerrado sesión correctamente'})
    }
)

router.get(
    '/',
    isUserAuthenticated,
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

router.post('/refresh-access-token', authController.refreshAccessToken)

module.exports = router;