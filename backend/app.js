
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path'); 
const fs = require('fs');
const helmet = require('helmet');
require('dotenv').config();
const session = require('express-session');


const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

mongoose.connect(process.env.MONGODB_PATH, { 
	useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.KEY_CORS);
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


app.use(session({ secret: process.env.KEY_COOKIE , cookie: {maxAge: 90000 }}))



app.use(bodyParser.json());

app.use(helmet());




app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);


module.exports = app;