'use strict'

const express = require('express');
console.log('Express Server')
const app = express();

const path = require('path');

app.use(express.static(path.join(__dirname, '/pub')));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '/pub/index.html'))
})

// Error codes
app.get('/problem', (req, res) => {
	res.status(500).send('There was a problem on the server')
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})