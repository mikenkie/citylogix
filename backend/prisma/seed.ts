import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Clean all data
  await prisma.tripStop.deleteMany();
  await prisma.trip.deleteMany();
  await prisma.stop.deleteMany();
  await prisma.route.deleteMany();
  console.log('Cleared all tables.');

  // Seed Routes
  const [red, blue] = await Promise.all([
    prisma.route.create({ data: { name: 'Red Line', type: 'train', active: true }}),
    prisma.route.create({ data: { name: 'Blue Line', type: 'train', active: true }})
  ]);
  console.log('Created routes:', { red, blue });

  // Seed Stops
  await prisma.stop.createMany({
    data: [
      { name: 'Central Station', location: '40.7128,-74.0060' },
      { name: 'Downtown', location: '40.7139,-74.0070' },
      { name: 'Park Street', location: '40.7142,-74.0080' },
      { name: 'Harbor Point', location: '40.7150,-74.0090' }
    ]
  });
  // Get stop IDs
  const allStops = await prisma.stop.findMany();
  console.log('Seeded stops:', allStops);

  if (allStops.length < 3) throw new Error('Not enough stops in DB!');

  // Seed Trips (2 per route, each visits 3 stops)
  for (const route of [red, blue]) {
    for (let t = 0; t < 2; t++) {
      const trip = await prisma.trip.create({
        data: {
          routeId: route.id,
          departureTime: new Date(Date.now() + t * 3600000),
          arrivalTime: new Date(Date.now() + (t + 1) * 3600000),
        }
      });
      console.log('Created trip:', trip);

      // Add 3 stops per trip
      for (let s = 0; s < 3; s++) {
        const tripStop = await prisma.tripStop.create({
          data: {
            tripId: trip.id,
            stopId: allStops[s].id,
            stopSequence: s + 1,
            arrivalTime: new Date(Date.now() + t * 3600000 + s * 600000),
            departureTime: new Date(Date.now() + t * 3600000 + s * 600000 + 300000),
          }
        });
        console.log('Created tripStop:', tripStop);
      }
    }
  }
}

main()
  .then(() => {
    console.log('Seed complete');
    return prisma.$disconnect();
  })
  .catch(e => {
    console.error(e);
    process.exit(1);
  });