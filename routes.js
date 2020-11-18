var express = require('express'),
    router = express.Router();

    router.get('/login', (req, res) => {
        res.end(`
        <h1>Login</h1>
        <form method="POST" action="/login">
            <input type="text" name="username">
            <input type="password" name="password">
            <button type="submit">Send</button>
        </form>
        `)
    })

    router.get('/', (req, res) => {
        res.end('<h1>Welcome to the home page</h1>');
    });

    router.get('/profile', (req, res) => {
        req.isAuthenticated() ? res.end('Welcome!') : res.redirect('/login')
    });

module.exports = router;