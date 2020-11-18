var express = require('express'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    User = require('./db'),
    router = express.Router();

passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, async (err, user) => {
        if (err) { return done(err); }
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }

        if (!await user.validPassword(password)) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
    });
}));

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    User.findOne({ _id: id }, (err, doc) => {
        if (err) done(err, null);
        done(null, doc);
    });
});

router.use(passport.initialize());
router.use(passport.session());

router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/profile'
}));

module.exports = router;