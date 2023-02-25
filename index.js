const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dbConfig = require('./src/config/db.js');
const passport = require('passport');
const router = require('./src/routes/index.js');
const cors = require('cors');
require('dotenv').config()
const cookieSession = require('express-session');
const fs = require('fs');

require('./src/models');
const { socketService } = require('./src/services/socketService.js');
require('./src/services/googleStrategy');

const COOKIE_SECRET = process.env.COOKIE_SECRET;

//Models 


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))

app.set("trust proxy", 1);


app.use(cookieSession({
    secret: COOKIE_SECRET,
    name: 'connect.sid',
    resave: false,
    saveUninitialized: true,
    cookie: {
        sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax', // must be 'none' to enable cross-site delivery
        secure: process.env.NODE_ENV === "production", // must be true if sameSite='none'
        maxAge: Number(process.env.SESSION_MAX_TIME)
    },
}));


app.use(passport.initialize());
app.use(passport.session());


app.use('/api', router);

dbConfig.sync()
    .then( () => console.log('Conectado al servidor'))
    .catch( err => {
        const errorinfo = `${new Date(Date.now()).toLocaleString()} - ${err} \n`
        console.log(errorinfo);
        fs.appendFile('logs/error.log', errorinfo, function (err) {
            if (err) throw err;
            process.exit(1);
        })
    })

process.on('uncaughtException', (err) => {
    const errorinfo = `${new Date(Date.now()).toLocaleString()} - ${err} \n`
    console.log(errorinfo);
    fs.appendFile('logs/error.log', errorinfo, function (err) {
        if (err) throw err;
        process.exit(1);
    })
});

process.on('unhandledRejection', (err) => {
    const errorinfo = `${new Date(Date.now()).toLocaleString()} - ${err} \n`
    console.log(errorinfo);
    fs.appendFile('logs/error.log', errorinfo, function (err) {
        if (err) throw err;
        process.exit(1);
    })
});



const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "127.0.0.1"

const server =  app.listen(PORT, HOST, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(server.address())
});

socketService(server)