const fs = require('fs');
const path = require('path');


const dataPath = path.join(__dirname, '../data/users.json'); // Path to the JSON file where user data is stored


// Function to read users from the JSON file
const readUsers = () => {
    const fileData = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(fileData || '[]');
};


// Function to save users to the JSON file
const saveUsers = (users) => {
    fs.writeFileSync(dataPath, JSON.stringify(users, null, 2));
};


// Function to find a user by username
const findByUsername = (username) => {
    const users = readUsers();
    return users.find(user => user.username === username);
};

// Function to find a user by email
const findByEmail = (email) => {
    const users = readUsers();
    return users.find(user => user.email === email);
};

// Function to find a user by ID
const findById = (id) => {
    const users = readUsers();
    return users.find(user => user.id === id);
};


// Function to add a new user
const addUser = (newUser) => {
    const users = readUsers();
    users.push(newUser);
    saveUsers(users);
};

// Exporting all functions for use in other files
module.exports = {
    findByUsername,
    findById,
    addUser,
    findByEmail
};
