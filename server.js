require('dotenv').config();

const mongoose = require('mongoose');
const http = require('http');
const app = require('./app');

const server = http.createServer(app);

const PORT = process.env.PORT || 8000;

mongoose
  .connect('mongodb://localhost:27017/exercises')
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is running on Port ${PORT}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });
