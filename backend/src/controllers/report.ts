import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getRoutesPopularity = async (_req: Request, res: Response) => {
  try {
    const data = await prisma.route.findMany({
      include: {
        trips: true
      }
    });

    const report = data.map(r => ({
      route: r.name,
      total_trips: r.trips.length
    }));

    res.json(report);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get route popularity', details: err });
  }
};
