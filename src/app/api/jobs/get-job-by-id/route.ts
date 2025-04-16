import prisma from "@/utils/dbconfig";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const jobId = url.searchParams.get("id");

    console.log('Job Id: ' + jobId)

    if (!jobId) {
      return new Response(
        JSON.stringify({ message: "Missing job ID parameter" }),
        { status: 400 }
      );
    }

    const job = await prisma.job.findUnique({
      where: { id: jobId },
      include: {
        company: true, // optional: include related company info
      },
    });

    if (!job) {
      return new Response(JSON.stringify({ message: "Job not found" }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({
        message: "Success!",
        job,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error fetching job by ID:", error);
    return new Response(
      JSON.stringify({ message: "Internal Server Error" }),
      {
        status: 500,
      }
    );
  }
}
