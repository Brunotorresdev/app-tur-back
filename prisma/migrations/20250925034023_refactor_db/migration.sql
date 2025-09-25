/*
  Warnings:

  - You are about to drop the column `driver_id` on the `DriverVehicles` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `Points` table. All the data in the column will be lost.
  - You are about to drop the column `lat` on the `Points` table. All the data in the column will be lost.
  - You are about to drop the column `long` on the `Points` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Points` table. All the data in the column will be lost.
  - You are about to drop the column `auth_provider` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `google_id` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `roleId` on the `Users` table. All the data in the column will be lost.
  - You are about to alter the column `address_state` on the `Users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(2)`.
  - You are about to drop the column `trip_id` on the `WalletHistory` table. All the data in the column will be lost.
  - You are about to drop the `Drivers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Packages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Permissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RolePermissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Roles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StartingPoints` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Trips` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[cnh]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cnh_img_url]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[crlv_img_url]` on the table `Vehicles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `DriverVehicles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address_city` to the `Points` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address_complement` to the `Points` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address_neighborhood` to the `Points` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address_number` to the `Points` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address_state` to the `Points` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address_street` to the `Points` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address_zipcode` to the `Points` table without a default value. This is not possible if the table is not empty.
  - Added the required column `applied_rate` to the `Points` table without a default value. This is not possible if the table is not empty.
  - Added the required column `base_value` to the `Points` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coverage_radius` to the `Points` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_gross_value` to the `Points` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_percentage` to the `Points` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Points` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `role` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DriverVehicles" DROP CONSTRAINT "DriverVehicles_driver_id_fkey";

-- DropForeignKey
ALTER TABLE "Drivers" DROP CONSTRAINT "Drivers_userId_fkey";

-- DropForeignKey
ALTER TABLE "Packages" DROP CONSTRAINT "Packages_driver_id_fkey";

-- DropForeignKey
ALTER TABLE "Packages" DROP CONSTRAINT "Packages_point_destination_id_fkey";

-- DropForeignKey
ALTER TABLE "Packages" DROP CONSTRAINT "Packages_point_origin_id_fkey";

-- DropForeignKey
ALTER TABLE "RolePermissions" DROP CONSTRAINT "RolePermissions_permissionId_fkey";

-- DropForeignKey
ALTER TABLE "RolePermissions" DROP CONSTRAINT "RolePermissions_roleId_fkey";

-- DropForeignKey
ALTER TABLE "Trips" DROP CONSTRAINT "Trips_client_id_fkey";

-- DropForeignKey
ALTER TABLE "Trips" DROP CONSTRAINT "Trips_driver_id_fkey";

-- DropForeignKey
ALTER TABLE "Trips" DROP CONSTRAINT "Trips_package_id_fkey";

-- DropForeignKey
ALTER TABLE "Trips" DROP CONSTRAINT "Trips_payment_id_fkey";

-- DropForeignKey
ALTER TABLE "Users" DROP CONSTRAINT "Users_roleId_fkey";

-- DropForeignKey
ALTER TABLE "WalletHistory" DROP CONSTRAINT "WalletHistory_trip_id_fkey";

-- DropIndex
DROP INDEX "DriverVehicles_driver_id_idx";

-- DropIndex
DROP INDEX "Users_roleId_idx";

-- DropIndex
DROP INDEX "WalletHistory_trip_id_idx";

-- AlterTable
ALTER TABLE "DriverVehicles" DROP COLUMN "driver_id",
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Points" DROP COLUMN "city",
DROP COLUMN "lat",
DROP COLUMN "long",
DROP COLUMN "state",
ADD COLUMN     "address_city" VARCHAR(255) NOT NULL,
ADD COLUMN     "address_complement" VARCHAR(255) NOT NULL,
ADD COLUMN     "address_neighborhood" VARCHAR(255) NOT NULL,
ADD COLUMN     "address_number" VARCHAR(255) NOT NULL,
ADD COLUMN     "address_state" VARCHAR(255) NOT NULL,
ADD COLUMN     "address_street" VARCHAR(255) NOT NULL,
ADD COLUMN     "address_zipcode" VARCHAR(20) NOT NULL,
ADD COLUMN     "applied_rate" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "base_value" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "coverage_radius" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "departure_interval" INTEGER,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "is_gross_value" BOOLEAN NOT NULL,
ADD COLUMN     "is_percentage" BOOLEAN NOT NULL,
ADD COLUMN     "latitude" DOUBLE PRECISION,
ADD COLUMN     "longitude" DOUBLE PRECISION,
ADD COLUMN     "note" VARCHAR(1000),
ALTER COLUMN "description" SET NOT NULL;

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "auth_provider",
DROP COLUMN "google_id",
DROP COLUMN "roleId",
ADD COLUMN     "address_zipcode" VARCHAR(20),
ADD COLUMN     "base_id" INTEGER,
ADD COLUMN     "birth_date" TIMESTAMP(3),
ADD COLUMN     "cnh" TEXT,
ADD COLUMN     "cnh_img_url" TEXT,
ADD COLUMN     "first_name" VARCHAR(255),
ADD COLUMN     "last_name" VARCHAR(255),
ADD COLUMN     "role" TEXT NOT NULL,
ALTER COLUMN "address_state" SET DATA TYPE VARCHAR(2);

-- AlterTable
ALTER TABLE "Vehicles" ADD COLUMN     "crlv_img_url" TEXT;

-- AlterTable
ALTER TABLE "WalletHistory" DROP COLUMN "trip_id";

-- DropTable
DROP TABLE "Drivers";

-- DropTable
DROP TABLE "Packages";

-- DropTable
DROP TABLE "Permissions";

-- DropTable
DROP TABLE "RolePermissions";

-- DropTable
DROP TABLE "Roles";

-- DropTable
DROP TABLE "StartingPoints";

-- DropTable
DROP TABLE "Trips";

-- CreateTable
CREATE TABLE "Bases" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "img_url" TEXT,
    "description" VARCHAR(1000),
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,

    CONSTRAINT "Bases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PointDestinations" (
    "id" SERIAL NOT NULL,
    "point_id" INTEGER NOT NULL,
    "destination" VARCHAR(255) NOT NULL,

    CONSTRAINT "PointDestinations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PointDestinations_point_id_idx" ON "PointDestinations"("point_id");

-- CreateIndex
CREATE INDEX "DriverVehicles_user_id_idx" ON "DriverVehicles"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Users_cnh_key" ON "Users"("cnh");

-- CreateIndex
CREATE UNIQUE INDEX "Users_cnh_img_url_key" ON "Users"("cnh_img_url");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicles_crlv_img_url_key" ON "Vehicles"("crlv_img_url");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_base_id_fkey" FOREIGN KEY ("base_id") REFERENCES "Bases"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DriverVehicles" ADD CONSTRAINT "DriverVehicles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PointDestinations" ADD CONSTRAINT "PointDestinations_point_id_fkey" FOREIGN KEY ("point_id") REFERENCES "Points"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
