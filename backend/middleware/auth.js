
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1];
		const decodedToken = jwt.verify(token, 'TOKEN_KEY');
		const userId = decodedToken.userId;
		if(req.body.userId && req.body.userId !== userId) {
			console.log('User ID non valable');
			throw 'User ID non valable';
		} else {
			next();
		}
	} catch (error) {
		res.status(403).json({ error: error | 'Pas la bonne personne' });
	}
}