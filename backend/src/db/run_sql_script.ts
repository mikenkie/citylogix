import { Client } from 'pg';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

async function runSqlFile() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();

  const sqlPath = path.resolve(__dirname, './get_next_trips.sql');
  const sql = fs.readFileSync(sqlPath, 'utf-8');
  await client.query(sql);

  await client.end();
  console.log('Loaded SQL function:', sqlPath);
}

runSqlFile().catch(err => {
  console.error('Error running SQL file:', err);
  process.exit(1);
});