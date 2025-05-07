import { NextRequest } from "next/server";
import prisma from "@/utils/dbconfig";
import { z } from "zod";

// Schema validation
const pdfSchema = z.object({
  companyId: z.string(),
  fileName: z.string().min(1),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = pdfSchema.safeParse({
      companyId: body.companyId,
      fileName: body.fileName,
    });

    if (!parsed.success) {
      return new Response(JSON.stringify({ message: "Invalid input", errors: parsed.error.errors }), {
        status: 400,
      });
    }

    const { companyId, fileName } = parsed.data;

    const newDoc = await prisma.pdf_Documents.create({
      data: {
        company_id: companyId,
        file_name: fileName,
      },
    });

    return new Response(JSON.stringify({ message: "PDF document saved", document: newDoc }), {
      status: 201,
    });
  } catch (error) {
    console.error("Error saving document:", error);
    return new Response(
      JSON.stringify({
        message: "Failed to save document",
        error: process.env.NODE_ENV === "development" ? (error as Error).message : undefined,
      }),
      { status: 500 }
    );
  }
}
