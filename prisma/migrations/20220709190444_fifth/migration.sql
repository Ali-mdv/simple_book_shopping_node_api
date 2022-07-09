/*
  Warnings:

  - Added the required column `picture` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "picture" TEXT NOT NULL;
