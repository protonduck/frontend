const path = require('path');
const express = require('express');
const cors = require('cors');
const fs = require('fs');

const port = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('json spaces', 2);

function mockDb(fileName) {
  return JSON.parse(fs.readFileSync(path.join(__dirname + '/mocks', fileName + '.json')));
}

function saveTemp(fileName, data) {
  fs.writeFile(path.join(__dirname + '/temp/' + fileName), JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.log(err);
    }
  });
}

app.get('/', (request, response) => {
  response.status(200).json({ message: 'Welcome to the mock API.' });
});

// List of all boards
app.get('/boards', (request, response) => {
  response.status(200).json(mockDb('boards').boards);
});

// Login user
app.post('/user/login', (request, response) => {
  if (request.body && request.body.email && request.body.password) {
    response.json(mockDb('user'));
  } else {
    response.status(401).json({ error: 'Invalid username or password' });
  }
});

// Register user
app.post('/user/signup', (request, response) => {
  if (request.body && request.body.name && request.body.email && request.body.password) {
    const user = {
      name: request.body.name,
      email: request.body.email,
      password: request.body.password,
    };

    let userData = {
      id: 39,
      name: user.name,
      language: 'en',
      premium_until: null,
      api_key: 'api_key_123',
    };

    saveTemp('user.json', userData);

    response.status(200).json(userData);
  } else {
    response.status(400).json({ error: 'Error' });
  }
});

app.listen(port, () => console.log('Mock server is running on http://localhost:' + port));
