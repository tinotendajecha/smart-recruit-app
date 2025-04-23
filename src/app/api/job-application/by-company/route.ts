import prisma from "@/utils/dbconfig";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "5");
    const companyId = url.searchParams.get("company_id");

    if (!companyId) {
      return new Response(
        JSON.stringify({ message: "Missing required query param: company_id" }),
        { status: 400 }
      );
    }

    const skip = (page - 1) * limit;

    // Count only the applications related to the specific company
    const totalApplications = await prisma.jobApplication.count({
      where: { company_id: companyId },
    });

    const applications = await prisma.jobApplication.findMany({
      where: { company_id: companyId },
      take: limit,
      skip,
      include: {
        user: true,
        job: true,
      },
      orderBy: {
        appliedAt: "desc",
      },
    });

    return new Response(
      JSON.stringify({
        message: "Success!",
        applications,
        totalApplications,
        totalPages: Math.ceil(totalApplications / limit),
        currentPage: page,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching job applications:", error);
    return new Response(
      JSON.stringify({
        message: "Internal Server Error when getting Applications!",
      }),
      { status: 500 }
    );
  }
}
