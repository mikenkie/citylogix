import express from 'express';
import { getRoutes, getRouteStops } from '../controllers/routes';

const router = express.Router();

router.get('/', getRoutes);
router.get('/:id/stops', getRouteStops);

export default router;