
const path = require('path')
const express = require('express');
const cors = require('cors');

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('json spaces', 2)

const fs = require('fs');
let rawdata = fs.readFileSync( path.join(__dirname, 'db.json'));
let db = JSON.parse(rawdata);

// List of all boards
app.get('/boards', (request, response) => {
  response.statusCode = 200;
  response.json(db.boards);
});

// Login user
app.post('/user/login', (request, response) => {
  let email = request.body.email;
	let password = request.body.password;

  if (email === 'test@example.com' && password === 'test') {
    response.statusCode = 200;
    response.json(db.user[0]);
  }
});

app.listen(port, () => console.log('Mock server is running on http://localhost:' + port));
