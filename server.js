'use strict'

const express = require('express');
console.log('Express Server')
const app = express();

const path = require('path');

app.use(express.static(path.join(__dirname, '/pub')));

app.get('/', (req, res) => {
	// sending a string
	//res.send('This should be the root route!')

	//sending some HTML
	res.send('<h1>Running backend...</h1>')
})

// Error codes
app.get('/problem', (req, res) => {
	res.status(500).send('There was a problem on the server')
})

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})