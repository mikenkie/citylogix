import express from 'express';
import { searchStops,getNextTrips } from '../controllers/stops';

const router = express.Router();

router.get('/search', searchStops);
router.get('/:id/next-trips', getNextTrips);

export default router;