require('dotenv').config();

var express = require('express'),
    session = require('express-session'),
    app = express(),
    passportRoutes = require('./passport'),
    regularRoutes = require('./routes');

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

app.use(require('body-parser').urlencoded({ extended: true }));

app.use(passportRoutes);
app.use(regularRoutes);

app.listen(3000, () => {
    console.log('Listening on port 3000');
});