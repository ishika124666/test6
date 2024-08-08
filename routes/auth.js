const express = require('express');
const router = express.Router();

// Dummy login route
router.get('/login', (req, res) => {
    res.render('login'); // Create a login.ejs for this
});

router.post('/login', (req, res) => {
    // Dummy authentication logic
    req.session.user = {
        name: 'John Doe',
        email: 'john@example.com',
        address: '123 Main St, Springfield',
        pincode: '123456'
    };
    res.redirect('/profile');
});

// Logout route
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/profile');
        }
        res.redirect('/login');
    });
});

module.exports = router;
