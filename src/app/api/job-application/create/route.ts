import { NextRequest } from "next/server";
import prisma from "@/utils/dbconfig";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      userId,
      jobId,
      linkedinProfile,
      portfolioWebsite,
      yearsOfExperience,
      coverLetter,
      resumeScore,
      linkedinScore,
      resumeMarkup,
      companyId
    } = body;

    if (!userId || !jobId) {
      return new Response(JSON.stringify({ message: "Missing required fields" }), {
        status: 400,
      });
    }

    const application = await prisma.jobApplication.create({
      data: {
        user_id: userId,
        job_id: jobId,
        linkedin_Profile: linkedinProfile || null,
        portfolio_website: portfolioWebsite || null,
        years_of_experience: yearsOfExperience || null,
        cover_letter: coverLetter || null,
        resume_score: resumeScore?.toString() || null,
        linkedin_score: linkedinScore?.toString() || null,
        resume_markup: resumeMarkup || null,
        company_id: companyId || null,
      },
    });

    return new Response(JSON.stringify({ message: "Application submitted!", application }), {
      status: 201,
    });
  } catch (error) {
    console.error("Error submitting application:", error);
    return new Response(JSON.stringify({ message: "Failed to submit application." }), {
      status: 500,
    });
  }
}
