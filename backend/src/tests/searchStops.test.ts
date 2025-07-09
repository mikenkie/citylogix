import request from 'supertest';
import app from '../../src/app';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('GET /stops/search', () => {
  beforeAll(async () => {
    // Insert a known stop for testing
    await prisma.stop.create({
      data: { name: 'Test Central', location: '0,0' }
    });
  });

  afterAll(async () => {
    await prisma.stop.deleteMany({ where: { name: { contains: 'Test' } } });
    await prisma.$disconnect();
  });

  it('returns stops that match the search name', async () => {
    const res = await request(app).get('/stops/search?name=Central');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(
      res.body.some(
        (stop: any) => stop.name.toLowerCase().includes('central')
      )
    ).toBe(true);
  });

  it('returns 400 if name parameter is missing', async () => {
    const res = await request(app).get('/stops/search');
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

});