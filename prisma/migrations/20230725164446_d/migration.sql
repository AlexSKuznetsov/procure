/*
  Warnings:

  - Added the required column `updatedAt` to the `Offer` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Offer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "companyId" TEXT NOT NULL,
    "lotNumber" INTEGER NOT NULL,
    "price" DECIMAL NOT NULL,
    "condition" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Offer_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Offer_lotNumber_fkey" FOREIGN KEY ("lotNumber") REFERENCES "Lot" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Offer" ("companyId", "condition", "description", "id", "lotNumber", "price") SELECT "companyId", "condition", "description", "id", "lotNumber", "price" FROM "Offer";
DROP TABLE "Offer";
ALTER TABLE "new_Offer" RENAME TO "Offer";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
