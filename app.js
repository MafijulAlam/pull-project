const express = require('express');
const morgan = require('morgan');
const {
  createGetController,
  createPostController,
  getAllPolls,
  viewPortGetController,
  viewPortPostcontroller,
} = require('./pollController');

const app = express();

app.set('view engine', 'ejs');
app.use([
  morgan('dev'),
  express.urlencoded({ extended: true }),
  express.json(),
]);

app.get('/create', createGetController);
app.post('/create', createPostController);
app.get('/polls', getAllPolls);
app.get('/polls/:id', viewPortGetController);
app.post('/polls/:id', viewPortPostcontroller);

app.get('', (req, res) => {
  res.render('home');
});

module.exports = app;
