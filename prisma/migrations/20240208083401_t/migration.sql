-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "accessToken" TEXT,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL
);
INSERT INTO "new_User" ("accessToken", "email", "id", "name", "passwordHash") SELECT "accessToken", "email", "id", "name", "passwordHash" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_accessToken_key" ON "User"("accessToken");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
