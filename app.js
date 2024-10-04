const express = require('express');
const bodyParser = require('body-parser');
const authMiddleware = require('./middleware/authMiddleware');
const userRoutes = require('./routes/user');


const app = express();

app.use(bodyParser.json());

app.use('/api/users', userRoutes);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'An unexpected error occurred.' });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});