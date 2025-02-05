import prisma from "@/utils/dbconfig";

export async function GET(req: Request) {
  try {

    // Set default values for pages and limit
    const url = new URL(req.url);
    const page = url.searchParams.get('page') || '1';
    const limit = url.searchParams.get('limit') || '5';

    // Add skip value
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get total jobs count
    const totalJobs = await prisma.job.count();

    // turn limit into page size for readability
    const pageSize = parseInt(limit);

    // Get paginated jobs
    const jobs = await prisma.job.findMany({
        take: pageSize,
        skip
    });

    // Return the job data
    return new Response(JSON.stringify({ message: "Success!", 
        jobs,
        totalJobs,
        totalPages: Math.ceil(totalJobs / pageSize),
        currentPage: parseInt(page),
    }), {
      status: 200,
    });

  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ message: "Internal Server Error when getting Jobs!" }),
      {
        status: 500,
      }
    );
  }
}
