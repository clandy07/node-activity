const fs = require('fs');
const path = require('path');


const dataPath = path.join(__dirname, '../data/users.json');


const readUsers = () => {
  const fileData = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(fileData || '[]'); 
};


const saveUsers = (users) => {
  fs.writeFileSync(dataPath, JSON.stringify(users, null, 2));
};


const findByUsername = (username) => {
  const users = readUsers();
  return users.find(user => user.username === username);
};


const findById = (id) => {
  const users = readUsers();
  return users.find(user => user.id === id);
};


const addUser = (newUser) => {
  const users = readUsers();
  users.push(newUser); 
  saveUsers(users); 
};


module.exports = {
  findByUsername,
  findById,
  addUser
};
