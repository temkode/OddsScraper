import express from 'express';
import { config } from 'dotenv';

// Load environment variables
config();

// Setup the express server
const app = express();
const port = process.env.PORT;

// Import middlewares into express
app.use(express.json());

// Import routes
import authRouter from './routes/auth.js';
import oddsRouter from './routes/odds.js';

// Setup all the routes
app.use('/api/odds', oddsRouter);
app.use('/auth', authRouter);

// Start the server
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

export default app;
