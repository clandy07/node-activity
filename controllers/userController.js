const userModel = require('../models/userModel');
const { registerSchema, loginSchema } = require('../models/validation');
const jwt = require('jsonwebtoken');


// Function to handle user registration
const registerUser = (req, res) => {
    // Joi schema validation for user registration
    const { error } = registerSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const { username, email, password } = req.body;

    // Check if a user with the same username or email already exists
    if (userModel.findByUsername(username) || userModel.findByEmail(email)) {
        return res.status(400).json({ message: "User already exists." });
    }

    const newUser = { id: Date.now(), username, email, password }; 
    userModel.addUser(newUser); 
    res.status(201).json({ message: "User registered successfully." }); 
};



// Function to handle user login
const loginUser = (req, res) => {
    // Joi schema validation for user login
    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const { username, password } = req.body;
    const user = userModel.findByUsername(username);

    // Check if the user exists and if the password matches
    if (!user || user.password !== password) {
        return res.status(400).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign({ username: user.username }, 'secret', { expiresIn: '1h' }); // Generate a JWT token with a 1-hour expiration

    res.json({ message: "Login successful.", token });// Respond with a success message and the JWT token
};


// Function to handle retrieving the user's profile
const getUserProfile = (req, res) => {
    const { username } = req.user; // Extract the username from the request
    const user = userModel.findByUsername(username); // Find the user in the database by username

    // Check if the user exists
    if (!user) {
        return res.status(404).json({ message: "User not found." });
    }

    res.json({ username: user.username, email: user.email }); // Respond with the user's profile data (username and email)
};

// Export functions
module.exports = { registerUser, loginUser, getUserProfile };
