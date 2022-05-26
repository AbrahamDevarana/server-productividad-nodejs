const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require("dotenv").config({ path: "variables.env" });

const User = require('../models/Users');


const googleLogin = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    passReqToCallback: true
},  async (accessToken, refreshToken, profile, done) => {
    console.log(profile)

    try{
        const oldUser = await User.findOne({ email: profile.email })
        if(oldUser){
            done(null, oldUser)
        }
        else{
            const newUser = await User.create({
                name: profile.displayName,
                email: profile.email,
                googleId: profile.id,
                avatar: profile.picture,
            })
            done(null, newUser)
        }
    }
    catch(err){
        console.log(err)
    }
})


passport.use(googleLogin)
