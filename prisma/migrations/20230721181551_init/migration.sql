-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Lot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "isFinished" BOOLEAN NOT NULL
);
INSERT INTO "new_Lot" ("description", "duration", "id", "isFinished", "name") SELECT "description", "duration", "id", "isFinished", "name" FROM "Lot";
DROP TABLE "Lot";
ALTER TABLE "new_Lot" RENAME TO "Lot";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
