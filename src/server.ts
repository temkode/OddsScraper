import express from 'express';

// Setup the express server
const app = express();
const port = 3000;

// Import middlewares into express
app.use(express.json());

// Import routes
import authRouter from './routes/auth.js';
import oddsRouter from './routes/odds.js';

// Setup all the routes
app.use('/api/odds', oddsRouter);
app.use('/api/auth', authRouter);

// Start the server
app.listen(port, () => {
	console.log(`Listening on port ${port}...`);
});
