const express = require('express');
const session = require('express-session');
const helmet = require('helmet');
const authRoutes = require('./routes/auth');

const app = express();

// Use Helmet to add security headers
app.use(helmet());

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Set up session management
app.use(session({
    secret: 'your-session-secret', // Replace with your own secret
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    }
    res.redirect('/auth/login');
}

// Use the authentication routes
app.use('/auth', authRoutes);

// Profile route (protected)
app.get('/profile', isAuthenticated, (req, res) => {
    res.render('profile', {
        name: req.session.user.name,
        email: req.session.user.email,
        address: req.session.user.address,
        pincode: req.session.user.pincode
    });
});

// Home route (optional, for testing)
app.get('/', (req, res) => {
    res.send('Welcome to the home page! Go to /auth/login to log in.');
});

// Handle 404 errors
app.use((req, res) => {
    res.status(404).send('Page not found');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
