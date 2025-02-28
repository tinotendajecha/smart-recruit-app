-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "Address" TEXT,
ADD COLUMN     "Facebook" TEXT,
ADD COLUMN     "Twitter" TEXT,
ADD COLUMN     "about_company" TEXT,
ADD COLUMN     "benefits_and_perks" TEXT[],
ADD COLUMN     "company_culture" TEXT,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "founded" TEXT,
ADD COLUMN     "linkedin" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "website" TEXT;

-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "company_id" TEXT;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
