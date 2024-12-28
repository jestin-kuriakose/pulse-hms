/*
  Warnings:

  - Added the required column `currentHistory` to the `Triage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Triage" ADD COLUMN     "currentHistory" TEXT NOT NULL;
