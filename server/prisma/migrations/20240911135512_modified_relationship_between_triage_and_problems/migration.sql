/*
  Warnings:

  - You are about to drop the column `created_at` on the `TriageProblem` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `TriageProblem` table. All the data in the column will be lost.
  - You are about to drop the `_ProblemToTriage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TriageProblem" DROP CONSTRAINT "TriageProblem_problemId_fkey";

-- DropForeignKey
ALTER TABLE "TriageProblem" DROP CONSTRAINT "TriageProblem_triageId_fkey";

-- DropForeignKey
ALTER TABLE "_ProblemToTriage" DROP CONSTRAINT "_ProblemToTriage_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProblemToTriage" DROP CONSTRAINT "_ProblemToTriage_B_fkey";

-- DropIndex
DROP INDEX "Problem_name_key";

-- AlterTable
ALTER TABLE "TriageProblem" DROP COLUMN "created_at",
DROP COLUMN "updated_at";

-- DropTable
DROP TABLE "_ProblemToTriage";

-- AddForeignKey
ALTER TABLE "TriageProblem" ADD CONSTRAINT "TriageProblem_triageId_fkey" FOREIGN KEY ("triageId") REFERENCES "Triage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TriageProblem" ADD CONSTRAINT "TriageProblem_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
