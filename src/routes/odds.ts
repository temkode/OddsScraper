import express, { Request, Response } from 'express';
import auth from '../middleware/auth.js';
import { admin, user } from '../middleware/roles.js';
import * as oddsService from '../services/oddsService.js';
import { RaceData } from '../interfaces.js';
import { isValidUrl } from '../services/utils.js';

const router = express.Router();

let storedRaceData: RaceData = {
  lastUpdated: 'Never',
  url: '',
  content: [],
};

router.get('/', [auth, user], (req: Request, res: Response) => {
  res.send({
    success: true,
    result: storedRaceData,
  });
});

router.post('/update', [auth, admin], async (req: Request, res: Response) => {
  try {
    const { url } = req.body;
    if (!url || !isValidUrl(url)) {
      return res.status(400).json({
        success: false,
        error: 'URL is missing or invalid in the request body',
      });
    }

    storedRaceData = {
      lastUpdated: new Date().toJSON(),
      url: url,
      content: await oddsService.scrapeRaceInfo(url),
    };

    res.status(200).send({
      success: true,
      result: storedRaceData,
    });
  } catch (error) {
    console.error('Error scraping odds:', error);
    return res.status(500).json({
      success: false,
      error: 'An error occurred while scraping the page',
    });
  }
});

export default router;
