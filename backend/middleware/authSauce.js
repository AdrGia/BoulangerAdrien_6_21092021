const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1];
		const decodedToken = jwt.verify(token, process.env.KEY_SECRET);
		const sauceId = decodedToken.sauceId;
		if(req.params.id && req.body.sauceId !== sauceId) {
			console.log('User ID non valable');
			throw 'User ID non valable';
		} else {
			next();
		}
	} catch (error) {
		res.status(403).json({ error: error | 'Pas la bonne personne' });
	}
}