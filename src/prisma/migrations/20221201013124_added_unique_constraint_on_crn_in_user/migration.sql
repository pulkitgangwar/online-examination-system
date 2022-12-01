/*
  Warnings:

  - A unique constraint covering the columns `[crn]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_crn_key" ON "User"("crn");
