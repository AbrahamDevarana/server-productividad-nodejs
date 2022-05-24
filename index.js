const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/db.js');
const passport = require('passport');
const router = require('./routes/index.js');
require("dotenv").config();

const app = express();

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(passport.initialize());

require('./services/googleStrategy');




// Routes 
app.use('/', router);
// app.use('/api', require('./routes/api.js'));


const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "0.0.0.0"

app.listen(PORT, HOST, () => {
    console.log(`Server running on port ${PORT}`);
});