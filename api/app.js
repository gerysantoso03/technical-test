/* Global Import */
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const session = require('express-session');
const initializeDB = require('./database/database');

// Load config file
dotenv.config({ path: './.env' });

// Global variable
const PORT = process.env.PORT | 2080;

// Initialize database
initializeDB();

// Initialize app
const app = express();

// Parse requests of content-type: application/json
app.use(bodyParser.json());

// Parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

/* Import Route */
const authRoutes = require('./routes/auth_routes');

// Use route
app.use('/api/auth', authRoutes);

// App listen
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
