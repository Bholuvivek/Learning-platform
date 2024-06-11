const express = require('express');
const app = express();
const port = 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// Define a GET route for the root URL
app.get('/', (req, res) => {
    res.send('Hello, User!');
});

// Define a GET route for /course
app.get('/course', (req, res) => {
    res.send('This is Course!');
});

// Define a POST route for /login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username && password) {
        // This is a simple example response
        res.send(`Login successful for user: ${username}`);
    } else {
        res.status(400).send('Username and password are required');
    }
 
});

// Start the server
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
