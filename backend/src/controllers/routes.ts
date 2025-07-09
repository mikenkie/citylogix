import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /routes - List all active routes, with pagination, filters, sorting
export const getRoutes = async (req: Request, res: Response) => {
  try {
    const { page = 1, pageSize = 10, type, active, sort } = req.query;

    // Filters
    const filters: any = {};
    if (type) filters.type = String(type);
    if (active !== undefined) filters.active = active === 'true';

    // Sorting
    let orderBy: any = {};
    if (sort) {
      const [field, dir] = String(sort).split(':');
      orderBy[field] = dir === 'desc' ? 'desc' : 'asc';
    }

    const skip = (Number(page) - 1) * Number(pageSize);
    const take = Number(pageSize);

    const routes = await prisma.route.findMany({
      where: filters,
      orderBy: Object.keys(orderBy).length ? orderBy : { name: 'asc' },
      skip,
      take,
    });

    res.json(routes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch routes', details: err });
  }
};

// GET /routes/:id/stops - Stops for a given route, ordered by stop_sequence
export const getRouteStops = async (req: Request, res: Response) => {
  try {
    const routeId = Number(req.params.id);

    const trips = await prisma.trip.findMany({
      where: { routeId },
      include: {
        tripStops: {
          include: { stop: true }
        }
      }
    });

        // Log the raw trips array
    console.log('Raw trips data:', JSON.stringify(trips, null, 2));

    const result = trips.map(trip => {
      // Log each trip as it is mapped
      console.log('Processing trip:', {
        id: trip.id,
        departureTime: trip.departureTime,
        arrivalTime: trip.arrivalTime,
        tripStops: trip.tripStops.map(ts => ({
          stopSequence: ts.stopSequence,
          stopId: ts.stop.id,
          stopName: ts.stop.name,
        }))
      });

      return {
        tripId: trip.id,
        departureTime: trip.departureTime,
        arrivalTime: trip.arrivalTime,
        stops: (trip.tripStops || [])
          .sort((a, b) => a.stopSequence - b.stopSequence)
          .map(ts => ({
            stopSequence: ts.stopSequence,
            stopId: ts.stop.id,
            stopName: ts.stop.name,
            arrivalTime: ts.arrivalTime,
            departureTime: ts.departureTime,
          }))
      };
    });

    // Log the final result
    console.log('Final result to return:', JSON.stringify(result, null, 2));

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch route stops', details: err });
  }
};
