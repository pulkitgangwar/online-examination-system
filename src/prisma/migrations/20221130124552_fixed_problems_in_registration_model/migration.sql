/*
  Warnings:

  - You are about to drop the column `Semester` on the `Registration` table. All the data in the column will be lost.
  - Added the required column `semester` to the `Registration` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Registration" DROP COLUMN "Semester",
ADD COLUMN     "semester" INTEGER NOT NULL,
ALTER COLUMN "crn" SET DATA TYPE TEXT;
