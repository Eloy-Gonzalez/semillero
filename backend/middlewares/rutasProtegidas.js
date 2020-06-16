const jwt = require('jsonwebtoken');

verifyToken = (req, res, next) => {
	let token = req.headers['x-mppct-token'] || req.headers['x-mppct-token-recover'];

	if (!token) {
		return res.status(200).json({ alert : { type: 'danger', title: 'Atención', message : 'Token requerido!'} });
	}

	jwt.verify(token, require('../config').key, (err, decoded) => {
		if (err) {
			return res.status(200).json({ alert: { type : 'danger', title: 'Atención', message: 'Token invalido!' } });
		} else {
			const now = Date.now().valueOf() / 1000;
			req.decoded = decoded;
			next();
			if (typeof decoded.exp !== 'undefined' && decoded.exp < now) {
				throw new Error(`token expired: ${JSON.stringify(decoded)}`)
			}
		}
	});
}

module.exports = {
	verifyToken
}