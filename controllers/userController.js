const userModel = require('../models/userModel');


const registerUser = (req, res) => {
    const { username, password, email } = req.body;

    if (userModel.findByUsername(username)) {
        return res.status(400).json({ message: "User already exists." });
    }

    const newUser = { id: Date.now(), username, password, email };
    userModel.addUser(newUser);
    res.status(201).json({ message: "User registered successfully." });
};



const loginUser = (req, res) => {
    const { username, password } = req.body;
    const user = userModel.findByUsername(username);

    if (!user || user.password !== password) {
        return res.status(400).json({ message: "Invalid credentials." });
    }

    res.json({ message: "Login successful.", token: "sample-token", username: user.username });
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
