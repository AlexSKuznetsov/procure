/*
  Warnings:

  - A unique constraint covering the columns `[winnerOfferId]` on the table `Lot` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Lot" ADD COLUMN "winnerOfferId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Lot_winnerOfferId_key" ON "Lot"("winnerOfferId");
