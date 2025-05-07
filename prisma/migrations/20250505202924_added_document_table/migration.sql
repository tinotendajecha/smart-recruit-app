-- CreateTable
CREATE TABLE "Pdf_Documents" (
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "file_name" TEXT NOT NULL,
    "uploadDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pdf_Documents_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pdf_Documents" ADD CONSTRAINT "Pdf_Documents_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
