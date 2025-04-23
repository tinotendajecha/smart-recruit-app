-- AlterTable
ALTER TABLE "JobApplication" ADD COLUMN     "company_id" TEXT,
ADD COLUMN     "stage" TEXT DEFAULT 'applied';

-- AddForeignKey
ALTER TABLE "JobApplication" ADD CONSTRAINT "JobApplication_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
