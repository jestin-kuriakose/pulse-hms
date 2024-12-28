-- Step 1: Add a new column to store the userId temporarily
ALTER TABLE "Note" ADD COLUMN "temp_userId" INTEGER;

-- Step 2: Update the temp_userId column with the corresponding userId from Employee
UPDATE "Note" n
SET "temp_userId" = e."userId"
FROM "Employee" e
WHERE n."createdBy" = e."id";

-- Step 3: Drop the existing foreign key constraint
ALTER TABLE "Note" DROP CONSTRAINT "Note_createdBy_fkey";

-- Step 4: Rename the createdBy column to maintain the field name
ALTER TABLE "Note" RENAME COLUMN "createdBy" TO "old_createdBy";

-- Step 5: Rename the temp_userId column to createdBy
ALTER TABLE "Note" RENAME COLUMN "temp_userId" TO "createdBy";

-- Step 6: Add the new foreign key constraint
ALTER TABLE "Note" ADD CONSTRAINT "Note_createdBy_fkey" 
    FOREIGN KEY ("createdBy") REFERENCES "Employee"("userId");

-- Step 7: Drop the old column
ALTER TABLE "Note" DROP COLUMN "old_createdBy";
