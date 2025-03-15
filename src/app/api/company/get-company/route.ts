import prisma from "@/utils/dbconfig";

export async function GET(req: Request) {
  try {

    // Need company Id
    const url = new URL(req.url)
    const company_id = url.searchParams.get('company_id');

    if (!company_id) {
        return new Response(
          JSON.stringify({ message: "Missing company_id parameter" }),
          { status: 400 }
        );
      }

    // Get the company profile
    const company = await prisma.company.findFirst({
      where: {
        id: company_id
      }
    });
    
    // Return the job data
    return new Response(JSON.stringify({ message: "Success fetching company!", 
        company
    }), {
      status: 200,
    });

  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ message: "Internal server error when missing company profile!" }),
      {
        status: 500,
      }
    );
  }
}
