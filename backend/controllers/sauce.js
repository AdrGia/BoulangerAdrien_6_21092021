
const sauce = require('../models/sauce');

exports.createSauce = (req, res, next) => {
	const sauceObject = JSON.parse(req.body.sauce);
	delete sauceObject._id;
	const sauce = new sauce({
		...sauceObject,
		imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
	});
	sauve.save()
		.then(() => res.status(201).json ({ message: 'Sauce enregistrée !'}))
		.catch(error => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) =>{
	sauce.findOne({_id: req.params.id})
		.then(sauce => res.status(200).json(sauce))
		.catch(error => res.status(404).json({ error}));
};

exports.getAllSauce = (req, res, next) => {
    Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
};

exports.modifySauce = (req, res, next) => {
	const sauceObject = req.file ?
	{
		...JSON.parse(req.body.sauce),
		 imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` 
	} : { ...req.body };
	sauce.updateOne({_id: req.params.id}, {...sauceObject, id: req.params.id})
		.then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
		.catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
	sauce.findOne({ _id: req.params.id})
		.then(sauce => {
			const filename = sauce.imageUrl.split('/images/')[1];
			fs.unlink(`images/${filename}`, () =>{
				sauce.deleteOne({ _id: req.params.id})
		.then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
		.catch(error => res.status(400).json({ error }));
		
			});
		})
		.catch(error => res.status(500).json({ error }));
};		