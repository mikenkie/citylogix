import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';

const prisma = new PrismaClient();

export const searchStops = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.query;
    if (!name) {
      res.status(400).json({ error: 'Name parameter is required' });
      return;
    }

    const stops = await prisma.stop.findMany({
      where: {
        name: { contains: String(name), mode: 'insensitive' }
      } as any
    });

    res.json(stops);
  } catch (err) {
    res.status(500).json({ error: 'Failed to search stops', details: err });
  }
};

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const getNextTrips = async (req: Request, res: Response): Promise<void> => {
  try {
    const stopId = Number(req.params.id);
    const { from_time } = req.query;

    if (!from_time) {
      res.status(400).json({ error: 'from_time query param is required (ISO string or timestamp)' });
      return;
    }

    // Call the SQL function directly
    const result = await pool.query(
      'SELECT * FROM get_next_trips($1, $2)',
      [stopId, from_time]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get next trips', details: err });
  }
};