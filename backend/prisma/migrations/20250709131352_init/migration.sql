/*
  Warnings:

  - You are about to drop the column `arrivalTime` on the `trip` table. All the data in the column will be lost.
  - You are about to drop the column `departureTime` on the `trip` table. All the data in the column will be lost.
  - You are about to drop the column `routeId` on the `trip` table. All the data in the column will be lost.
  - You are about to drop the column `arrivalTime` on the `trip_stop` table. All the data in the column will be lost.
  - You are about to drop the column `departureTime` on the `trip_stop` table. All the data in the column will be lost.
  - You are about to drop the column `stopId` on the `trip_stop` table. All the data in the column will be lost.
  - You are about to drop the column `stopSequence` on the `trip_stop` table. All the data in the column will be lost.
  - You are about to drop the column `tripId` on the `trip_stop` table. All the data in the column will be lost.
  - Added the required column `arrival_time` to the `trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departure_time` to the `trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `route_id` to the `trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `arrival_time` to the `trip_stop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departure_time` to the `trip_stop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stop_id` to the `trip_stop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stop_sequence` to the `trip_stop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trip_id` to the `trip_stop` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "trip" DROP CONSTRAINT "trip_routeId_fkey";

-- DropForeignKey
ALTER TABLE "trip_stop" DROP CONSTRAINT "trip_stop_stopId_fkey";

-- DropForeignKey
ALTER TABLE "trip_stop" DROP CONSTRAINT "trip_stop_tripId_fkey";

-- AlterTable
ALTER TABLE "trip" DROP COLUMN "arrivalTime",
DROP COLUMN "departureTime",
DROP COLUMN "routeId",
ADD COLUMN     "arrival_time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "departure_time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "route_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "trip_stop" DROP COLUMN "arrivalTime",
DROP COLUMN "departureTime",
DROP COLUMN "stopId",
DROP COLUMN "stopSequence",
DROP COLUMN "tripId",
ADD COLUMN     "arrival_time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "departure_time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "stop_id" INTEGER NOT NULL,
ADD COLUMN     "stop_sequence" INTEGER NOT NULL,
ADD COLUMN     "trip_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "trip" ADD CONSTRAINT "trip_route_id_fkey" FOREIGN KEY ("route_id") REFERENCES "route"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trip_stop" ADD CONSTRAINT "trip_stop_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trip_stop" ADD CONSTRAINT "trip_stop_stop_id_fkey" FOREIGN KEY ("stop_id") REFERENCES "stop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
