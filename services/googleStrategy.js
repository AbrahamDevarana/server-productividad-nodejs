const User = require('../models/Users');
require("dotenv").config({ path: ".env" });


const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;


const googleLogin = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    passReqToCallback: true
},  async (request, accessToken, refreshToken, profile, done) => {
    const email = profile.emails[0].value;
       
        const user = await User.findOne({
            where: { email: email },
            defaults: {
                name: profile.name.givenName,
                lastName: (profile.name.familyName).split(" ", 2)[0],
                secondLastName: (profile.name.familyName).split(" ", 2)[1],
                email: email,
                google_id: profile.id,
                password: 'Devarana#1234*',
                picture: profile.photos[0].value
            }
        }).catch(error => {
            console.log('Error',error);
            return done(error, null);
        });

        if (user) {
            await user.update({
                google_id: profile.id,
                password: 'Devarana#1234*',
                picture: user.picture === null ? profile.photos[0].value : user.picture
            })
            await user.save()
            return done(null, user.dataValues);
        }else{
            return done(null, false);
        }
})

passport.serializeUser((user, done) => {
    return done(null, user.id);
})

passport.deserializeUser( async (id, done) => {
    const user = await User.findOne({ where:{id: id } }).catch(error => {
        // console.log('Error',error);
        return done(error, null);
    });
       
    if(user){
        return done(null, user);
    }
    
     
})


passport.use(googleLogin);