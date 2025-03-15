import prisma from "@/utils/dbconfig";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const companyId = url.searchParams.get("companyId");

    if (!companyId) {
      return new Response(
        JSON.stringify({ message: "Missing companyId parameter" }),
        { status: 400 }
      );
    }

    // Fetch all jobs for the given companyId
    const jobs = await prisma.job.findMany({
      where: { company_id: companyId },
    });

    return new Response(
      JSON.stringify({
        message: "Success!",
        jobs,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return new Response(
      JSON.stringify({ message: "Internal Server Error when getting Jobs!" }),
      {
        status: 500,
      }
    );
  }
}
