/*
  Warnings:

  - You are about to drop the column `password` on the `Costomer` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phone_number]` on the table `Costomer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `phone_number` to the `Costomer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Costomer" DROP COLUMN "password",
ADD COLUMN     "phone_number" VARCHAR(16) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Costomer_phone_number_key" ON "Costomer"("phone_number");
