import prisma from "@/utils/dbconfig";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    // Extract company ID from request body
    const { id, ...updateData } = body;

    if (!id) {
      return new Response(JSON.stringify({ message: "Company ID is required!" }), { status: 400 });
    }

    // Check if the company exists
    const existingCompany = await prisma.company.findUnique({ where: { id } });

    if (!existingCompany) {
      return new Response(JSON.stringify({ message: "Company not found!" }), { status: 404 });
    }

    // Update the company
    const updatedCompany = await prisma.company.update({
      where: { id },
      data: updateData, // Updates only the provided fields
    });

    return new Response(JSON.stringify({ message: "Company updated successfully!", updatedCompany }), {
      status: 200,
    });

  } catch (error) {
    console.error("Error updating company:", error);
    return new Response(JSON.stringify({ message: "Internal server error!" }), { status: 500 });
  }
}
