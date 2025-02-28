import prisma from "@/utils/dbconfig";
import bcrypt from "bcrypt";

interface User_And_Company_Data {
  name: string;
  surname: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  cityLocation: string;
  companyName: string;
  companyWebsite: string;
  countryLocation: string;
  organizationSize: string;
  servicesProvided: string;
}

export async function POST(req: Request) {
  try {
    // Implement register company here

    // Destructure the form data
    const body: User_And_Company_Data = await req.json();

    if (!body) {
      return new Response(
        JSON.stringify({ message: "All User fields are required!" })
      );
    }

    // Check if user exists in database
    const userAlreadyExists = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (userAlreadyExists) {
      return new Response(JSON.stringify({ message: "User Already exists!" }), {
        status: 401,
      });
    }

    // Now hash the password
    const saltrounds = 10;
    // const passwordHash = await bcrypt.hash(user.password, saltrounds)
    const passwordHash = await bcrypt.hash(body.password, saltrounds);

    // Now save the user to prisma
    const register_user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: passwordHash,
        surname: body.surname,
        role: body.role,
      },
    });

    // If user role is Admin, that means we have to save the company data as well
    if (body.role == "Admin") {
      // Save the company data as well
      const register_company = await prisma.company.create({
        data: {
          company_name: body.companyName,
          organization_size: body.organizationSize,
          country: body.countryLocation,
          city: body.cityLocation,
          services_provided: body.servicesProvided,
          company_website: body.companyWebsite
        },
      });

      // Now create a relation between company and user
      const company_user_pivot = await prisma.company_User.create({
        data: {
          company_id: register_company.id,
          user_id: register_user.id,
        },
      });
    }

    return new Response(
      JSON.stringify({
        message: "User Registered Successfully!",
        register_user,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(`Error: ${error}`);
    return new Response(
      JSON.stringify({
        message: "Internal Server Error when User and Company!",
      }),
      {
        status: 500,
      }
    );
  }
}
