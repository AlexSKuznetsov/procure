/*
  Warnings:

  - Added the required column `duration` to the `Lot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isFinished` to the `Lot` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Lot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "duration" DATETIME NOT NULL,
    "isFinished" BOOLEAN NOT NULL
);
INSERT INTO "new_Lot" ("description", "id", "name") SELECT "description", "id", "name" FROM "Lot";
DROP TABLE "Lot";
ALTER TABLE "new_Lot" RENAME TO "Lot";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
