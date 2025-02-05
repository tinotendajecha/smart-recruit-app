import prisma from "@/utils/dbconfig";
import dotenv from "dotenv";
dotenv.config();
import { Job } from "@/types/Job";



export async function POST(req: Request) {
  try {

    // Get the user data from the request body
    const body: Job = await req.json()

    // Create the job
    const job = await prisma.job.create({
        data: {
            ...body
        }
    })

    // Return the job data
    return new Response(JSON.stringify({ message: "Job Created!" , job}));

  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ message: "Internal Server Error when creating Job!" }),
      {
        status: 500,
      }
    );
  }
}
