import prisma from "@/utils/dbconfig";

export async function GET() {
  try {
    // Fetch all companies
    const companies = await prisma.company.findMany();

    return new Response(
      JSON.stringify({ message: "Success fetching all companies!", companies }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching companies:", error);
    return new Response(
      JSON.stringify({ message: "Internal server error when fetching companies!" }),
      { status: 500 }
    );
  }
}
