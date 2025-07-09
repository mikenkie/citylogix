// Place this jest.mock at the very top of your test file
jest.mock('@prisma/client', () => {
  const mockFindMany = jest.fn();
  return {
    PrismaClient: jest.fn(() => ({
      trip: { findMany: mockFindMany }
    })),
    __esModule: true,
    _mockFindMany: mockFindMany
  };
});

import { PrismaClient } from '@prisma/client';
import { getRouteStops } from '../controllers/routes';

describe('getRouteStops controller', () => {
  let req: any, res: any, mockFindMany: jest.Mock;

  beforeEach(() => {
    req = { params: { id: '2' } };
    res = {
      json: jest.fn(),
      status: jest.fn(() => res)
    };
    // Here’s the robust way:
    mockFindMany = (new (PrismaClient as any)()).trip.findMany;
    mockFindMany.mockReset();
  });

  it('returns trips with stops for a route', async () => {
    mockFindMany.mockResolvedValue([
      {
        id: 2,
        departureTime: '2025-07-11T08:00:00.000Z',
        arrivalTime: '2025-07-11T09:00:00.000Z',
        tripStops: [
          {
            stopSequence: 1,
            stop: { id: 10, name: 'Central' },
            arrivalTime: '2025-07-11T08:15:00.000Z',
            departureTime: '2025-07-11T08:17:00.000Z'
          },
          {
            stopSequence: 2,
            stop: { id: 11, name: 'Park' },
            arrivalTime: '2025-07-11T08:25:00.000Z',
            departureTime: '2025-07-11T08:27:00.000Z'
          }
        ]
      }
    ]);

    await getRouteStops(req, res);

    expect(mockFindMany).toHaveBeenCalledWith({
      where: { routeId: 2 },
      include: { tripStops: { include: { stop: true } } }
    });
    expect(res.json).toHaveBeenCalledWith([
      {
        tripId: 2,
        departureTime: '2025-07-11T08:00:00.000Z',
        arrivalTime: '2025-07-11T09:00:00.000Z',
        stops: [
          {
            stopSequence: 1,
            stopId: 10,
            stopName: 'Central',
            arrivalTime: '2025-07-11T08:15:00.000Z',
            departureTime: '2025-07-11T08:17:00.000Z'
          },
          {
            stopSequence: 2,
            stopId: 11,
            stopName: 'Park',
            arrivalTime: '2025-07-11T08:25:00.000Z',
            departureTime: '2025-07-11T08:27:00.000Z'
          }
        ]
      }
    ]);
  });

  it('handles errors and responds with 500', async () => {
    mockFindMany.mockRejectedValue(new Error('DB error!'));
    await getRouteStops(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: expect.any(String) }));
  });
});
