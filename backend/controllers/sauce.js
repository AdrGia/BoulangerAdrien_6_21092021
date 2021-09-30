
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

exports.likeDislikeSauce = (req, res, next) => {
	const userId = req.body.userId;
	const like = req.body.like;
	const sauceId = req.params.id;

	  Sauce.findOne({ _id: sauceId })
        .then(sauce => {
            
            const newValues = {
                usersLiked: sauce.usersLiked,
                usersDisliked: sauce.usersDisliked,
                likes: 0,
                dislikes: 0
            }
            
            switch (like) {
                case 1:  
                    newValues.usersLiked.push(userId);
                    break;
                case -1:  
                    newValues.usersDisliked.push(userId);
                    break;
                case 0:  
                    if (newValues.usersLiked.includes(userId)) {
                        
                        const index = newValues.usersLiked.indexOf(userId);
                        newValues.usersLiked.splice(index, 1);
                    } else {
                        
                        const index = newValues.usersDisliked.indexOf(userId);
                        newValues.usersDisliked.splice(index, 1);
                    }
                    break;
            };
           
            newValues.likes = newValues.usersLiked.length;
            newValues.dislikes = newValues.usersDisliked.length;
            
            Sauce.updateOne({ _id: sauceId }, newValues )
                .then(() => res.status(200).json({ message: 'Sauce notée !' }))
                .catch(error => res.status(400).json({ error }))  
        })
        .catch(error => res.status(500).json({ error }));
}
