const express = require('express');
const mysql = require('mysql2');
const bodyparser = require('body-parser');
const passport = require ('passport');

const auth = require ('./src/routes/auth.js');
const app = express();
const router = require('./src/routes/auth');

app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use (passport.initialize ());

require ('./strategies/jsonwtstartegy.js') (passport);




app.use ('/api/auth', auth);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`App is running at ${port}`));