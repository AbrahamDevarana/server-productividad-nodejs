const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/db.js');
const passport = require('passport');
const router = require('./routes/index.js');
const cors = require('cors');
require('dotenv').config()
const cookieSession = require('express-session');
const app = express();

const COOKIE_SECRET = process.env.COOKIE_SECRET;

//Models 
const User = require('./models/Users');
const Perspectiva = require('./models/Perspectiva');
const Objetivos = require('./models/Objetivos');
const Responsabilidad = require('./models/Responsabilidad');

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors( { origin: process.env.CLIENT_URL, credentials:true } ));

app.use(cookieSession({
    secret: COOKIE_SECRET,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours,
    saveUninitialized: true,
    resave: false,
    name: 'express',
    cookie: {
        sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax', // must be 'none' to enable cross-site delivery
        secure: process.env.NODE_ENV === "production", // must be true if sameSite='none'
    }
}));

app.use(passport.initialize());
app.use(passport.session());
app.set("trust proxy", 1);
require('./services/googleStrategy');

// Routes 
app.use('/api', router);

dbConfig.sync()
    .then( () => console.log('Conectado al servidor'))
    .catch( error => console.log(error))




const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "0.0.0.0"

app.listen(PORT, HOST, () => {
    console.log(`Server running on port ${PORT}`);
});