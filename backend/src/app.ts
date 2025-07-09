import express, { Request, Response } from 'express';
import cors from 'cors';
import routesRouter from './routes/routes';
import stopsRouter from './routes/stops';
import reportRouter from './routes/report';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/routes', routesRouter);
app.use('/stops', stopsRouter);
app.use('/report', reportRouter);

export default app;