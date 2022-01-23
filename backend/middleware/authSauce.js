const jwt = require('jsonwebtoken');
const Sauce = require('../models/sauce');

module.exports = (req, res, next) => {

	try {
		const token = req.headers.authorization.split(' ')[1];
		const decodedToken = jwt.verify(token, process.env.KEY_SECRET);
		const userId = decodedToken.userId;

		Sauce.findOne({_id: req.params.id, userId })
			.then(sauce => {
				next();
			})
			
	} catch (error) {
		res.status(403).json({ error: error });
	}
}