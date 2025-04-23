import prisma from "@/utils/dbconfig";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
  try {
    const { userId } = params;

    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "5");
    const skip = (page - 1) * limit;

    // Count total applications for this user
    const totalApplications = await prisma.jobApplication.count({
      where: {
        user_id: userId,
      },
    });

    // Fetch paginated applications
    const applications = await prisma.jobApplication.findMany({
      where: {
        user_id: userId,
      },
      include: {
        job: true, // include job details if needed
      },
      take: limit,
      skip,
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
      JSON.stringify({ message: "Internal Server Error while fetching applications." }),
      { status: 500 }
    );
  }
}
