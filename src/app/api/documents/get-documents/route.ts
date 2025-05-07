import { NextRequest } from "next/server";
import prisma from "@/utils/dbconfig";
import { z } from "zod";

// Schema validation for query params
const querySchema = z.object({
  companyId: z.string(),
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const companyId = searchParams.get("companyId");

    const parsed = querySchema.safeParse({ companyId });

    if (!parsed.success) {
      return new Response(JSON.stringify({ message: "Invalid or missing companyId", errors: parsed.error.errors }), {
        status: 400,
      });
    }

    const documents = await prisma.pdf_Documents.findMany({
      where: { company_id: parsed.data.companyId },
      orderBy: { uploadDate: "desc" }, // optional: newest first
    });

    return new Response(JSON.stringify({ documents }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching documents:", error);
    return new Response(
      JSON.stringify({
        message: "Failed to fetch documents",
        error: process.env.NODE_ENV === "development" ? (error as Error).message : undefined,
      }),
      { status: 500 }
    );
  }
}
