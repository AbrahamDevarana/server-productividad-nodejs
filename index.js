const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/db.js');
const passport = require('passport');
const router = require('./routes/index.js');
const cors = require('cors');
require("dotenv").config();

const app = express();



//Models 
const User = require('./models/Users');
const Perspectiva = require('./models/Perspectiva');
const Objetivos = require('./models/Objetivos');

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors());
app.use(passport.initialize());

require('./services/googleStrategy');

// Routes 
app.use('/api', router);
// app.use('/api', require('./routes/api.js'));

dbConfig.sync()
    .then( () => console.log('Conectado al servidor'))
    .catch( error => console.log(error))




const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "0.0.0.0"

app.listen(PORT, HOST, () => {
    console.log(`Server running on port ${PORT}`);
});