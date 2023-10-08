export function admin(req, res, next) {
	switch (req.user.role) {
		case 'admin':
			break;
		default:
			return res.status(403).send({
				success: false,
				error: 'Access denied.',
			});
	}
	next();
}

export function user(req, res, next) {
	switch (req.user.role) {
		case 'admin':
			break;
		case 'user':
			break;
		default:
			return res.status(403).send({
				success: false,
				error: 'Access denied.',
			});
	}
	next();
}
