import express from 'express';
import { getRoutesPopularity } from '../controllers/report';

const router = express.Router();

router.get('/routes/popularity', getRoutesPopularity);

export default router;