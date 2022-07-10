/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Token" DROP CONSTRAINT "Token_user_id_fkey";

-- AlterTable
ALTER TABLE "Token" ALTER COLUMN "user_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- CreateTable
CREATE TABLE "Costomer" (
    "id" TEXT NOT NULL,
    "first" VARCHAR(40),
    "last" VARCHAR(40),
    "password" VARCHAR(128) NOT NULL,
    "email" VARCHAR(60) NOT NULL,

    CONSTRAINT "Costomer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "city" VARCHAR(30) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "no" VARCHAR(10) NOT NULL,
    "unit" INTEGER NOT NULL,
    "postal_code" VARCHAR(40) NOT NULL,
    "costomer_id" TEXT,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Costomer_email_key" ON "Costomer"("email");

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_costomer_id_fkey" FOREIGN KEY ("costomer_id") REFERENCES "Costomer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
