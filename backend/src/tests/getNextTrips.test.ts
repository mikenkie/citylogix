import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

describe('get_next_trips PostgreSQL function', () => {
  it('returns the next trips for a stop after a time', async () => {
    const stopId = 1; // Use a valid stopId from your seeded DB
    const fromTime = new Date().toISOString();

    const result = await pool.query(
      'SELECT * FROM get_next_trips($1, $2)',
      [stopId, fromTime]
    );
    expect(Array.isArray(result.rows)).toBe(true);

    // Optional: check structure if any trips exist
    if (result.rows.length > 0) {
      const trip = result.rows[0];
      expect(trip).toHaveProperty('trip_id');
      expect(trip).toHaveProperty('route_name');
      expect(trip).toHaveProperty('arrival_time');
    }
  });

  afterAll(async () => {
    await pool.end();
  });
});