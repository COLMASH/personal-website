/*
  Warnings:

  - You are about to drop the column `company` on the `contact_submissions` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_contact_submissions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "website" TEXT,
    "services" TEXT NOT NULL,
    "timeline" TEXT,
    "budget" TEXT,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'NEW',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_contact_submissions" ("budget", "created_at", "description", "email", "id", "name", "services", "status", "timeline", "updated_at", "website") SELECT "budget", "created_at", "description", "email", "id", "name", "services", "status", "timeline", "updated_at", "website" FROM "contact_submissions";
DROP TABLE "contact_submissions";
ALTER TABLE "new_contact_submissions" RENAME TO "contact_submissions";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
