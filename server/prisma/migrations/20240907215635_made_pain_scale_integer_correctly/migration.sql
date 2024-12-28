/*
  Warnings:

  - Changed the type of `painScale` on the `Triage` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Triage" DROP COLUMN "painScale",
ADD COLUMN     "painScale" INTEGER NOT NULL;
