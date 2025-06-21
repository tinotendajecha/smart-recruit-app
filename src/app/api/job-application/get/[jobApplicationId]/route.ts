import prisma from "@/utils/dbconfig";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: { jobApplicationId: string } }
) {
  try {
    const jobApplicationId = context.params.jobApplicationId;

    if (!jobApplicationId) {
      return new Response(
        JSON.stringify({ message: "Missing jobApplicationId in URL." }),
        { status: 400 }
      );
    }

    const application = await prisma.jobApplication.findUnique({
      where: {
        id: jobApplicationId,
      },
      include: {
        job: true,
        user: true,
      },
    });

    if (!application) {
      return new Response(
        JSON.stringify({ message: "Job application not found." }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify({ message: "Success!", application }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching job application:", error);
    return new Response(
      JSON.stringify({
        message: "Internal Server Error while fetching application.",
      }),
      { status: 500 }
    );
  }
}
