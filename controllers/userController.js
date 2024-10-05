const userModel = require('../models/userModel');
const { registerSchema, loginSchema } = require('../models/validation');
const jwt = require('jsonwebtoken');


const registerUser = (req, res) => {
    const { error } = registerSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const { username, email, password } = req.body;

    if (userModel.findByUsername(username) || userModel.findByEmail(email)) {
        return res.status(400).json({ message: "User already exists." });
    }

    const newUser = { id: Date.now(), username, email, password };
    userModel.addUser(newUser);
    res.status(201).json({ message: "User registered successfully." });
};



const loginUser = (req, res) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const { username, password } = req.body;
    const user = userModel.findByUsername(username);

    if (!user || user.password !== password) {
        return res.status(400).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign({ username: user.username }, 'secret', { expiresIn: '1h' });

    res.json({ message: "Login successful.", token });
};


const getUserProfile = (req, res) => {
    const { username } = req.user;
    const user = userModel.findByUsername(username);

    if (!user) {
        return res.status(404).json({ message: "User not found." });
    }

    res.json({ username: user.username, email: user.email });
};

module.exports = { registerUser, loginUser, getUserProfile };
