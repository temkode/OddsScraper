import express, { Request, Response } from 'express';
import auth from '../middleware/auth.js';
import { admin, user } from '../middleware/roles.js';
import * as oddsService from '../services/oddsService.js';

interface OddsData {
	lastUpdated: string;
	content: string;
}

let odds: OddsData = {
	lastUpdated: 'Never',
	content: '',
};

const router = express.Router();

router.get('/', [auth, user], (req: Request, res: Response) => {
	res.send({
		success: true,
		result: odds,
	});
});

router.post('/update', [auth, admin], async (req: Request, res: Response) => {
	odds = {
		lastUpdated: new Date().toJSON(),
		content: await oddsService.getCurrentOdds(),
	};

	res.status(200).send({
		success: true,
		result: odds,
	});
});

export default router;
