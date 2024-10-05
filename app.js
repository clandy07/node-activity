const express = require('express');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit'); 
const userRoutes = require('./routes/user');
const loggingMiddleware = require('./middleware/loggingMiddleware');


const app = express();

app.use(bodyParser.json());
app.use(loggingMiddleware);

const limiter = rateLimit({
    windowMs: 3 * 60 * 1000,
    max: 25,
    message: 'Too many requests, please try again later.'
});

app.use(limiter);

app.use('/api/users', userRoutes);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'An unexpected error occurred.' });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});