const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const bodyParser  = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',require('./routes/index'));

app.use((req,res,next) => {
    res.status(404).render('404');
})

mongoose
  .connect(process.env.MONGO_CONNECTION_URL)
  .then(result => {
    console.log("Connected to database");
    console.log(`Listening on ${process.env.PORT}`);
    app.listen(process.env.PORT || 3000);
  })
  .catch(err => {
    console.log("Error connecting to database");
  });