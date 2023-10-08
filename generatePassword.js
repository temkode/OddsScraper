// Import dependencies
import bcrypt from 'bcrypt';

(async () => {
	// Hash the password
	const salt = await bcrypt.genSalt(15);
	console.log(await bcrypt.hash('user', salt));
})();
