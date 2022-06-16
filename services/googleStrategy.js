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
        // const user = await User.findOne({ where:{ email: email } }).catch(error => {
        //     console.log('Error',error);
        //     return done(error, null);
        // });

        // if (user) {
        //     console.log('User found', user);
        //     return done(null, user);
        // }

        const [user] = await User.findOrCreate({
            where: { email: email },
            defaults: {
                name: profile.name.givenName,
                lastName: (profile.name.familyName).split(" ", 2)[0],
                secondLastName: (profile.name.familyName).split(" ", 2)[1],
                email: email,
                googleId: profile.id,
                password: 'Devarana#1234*',

            }
        }).catch(error => {
            console.log('Error',error);
            return done(error, null);
        });

        if (user) {
            // console.log('User found', user);
            return done(null, user);
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