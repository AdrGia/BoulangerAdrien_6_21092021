
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const sauce = require('./models/sauce');

const userRoutes = require('./routes/user');

mongoose.connect('mongodb+srv://Piiquante:PimentdeCayenne33@cluster0.pnpp1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

app.post('/api/sauce', (req, res, next) => {
	delete req.body._id;
	const sauce = new sauce({
		...req.body
	});
	sauve.save()
		.then(() => res.status(201).json ({ message: 'Sauce enregistrée !'}))
		.catch(error => res.status(400).json({ error }));
});

app.get('/api/sauce/:id', (req, res, next) =>{
	sauce.findOne({_id: req.params.id})
		.then(sauce => res.status(200).json(sauce))
		.catch(error => res.status(404).json({ error}));
});


app.use('/api/sauce', (req, res, next) =>{
	sauce.find()
	.then(sauces => res.status(200).json(sauces))
	.catch(error => res.status(400).json({ error}));
});	
app.use('/api/auth', userRoutes);


module.exports = app;