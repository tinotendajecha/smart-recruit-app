import prisma from "@/utils/dbconfig";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

interface User {
  email: string;
  password: string;
}

export async function POST(req: Request) {
  try {
    // Implement login here
    const user: User = await req.json();

    // Look for email in db
    const userData = await prisma.user.findFirst({
      where: {
        email: user.email,
      },
      include: {
        Company_User: true,
      },
    });

    // console.log(userData)

    if (!userData) {
      return new Response(
        JSON.stringify({ message: "User does not exists!" }),
        { status: 401 }
      );
    }

    // Compare the passwords
    const passwordMatch = await bcrypt.compare(
      user.password,
      userData?.password
    );

    if (!passwordMatch) {
      return new Response(
        JSON.stringify({ message: "Incorrect Email or Password!" }),
        {
          status: 401,
        }
      );
    }

    const email = userData.email;

    // Generate JWT
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT Secret is not defined");
    }

    // create JWT token
    const token = jwt.sign({ email }, secret, { expiresIn: "1h" });

    // Set cookie
    const cookie = serialize("siteJWT", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    // If user is admin, this means company data exists
    if (userData.role == "Admin") {
      // Return company info
      const company_id = userData.Company_User[0].company_id;

      // Query the companies table and return the company info
      const company_data = await prisma.company.findFirst({
        where: {
          id: company_id,
        },
      });

      return new Response(
        JSON.stringify({ message: "Auth Success!", userData ,company_data }),
        {
          headers: {
            "Set-Cookie": cookie,
          },
          status: 200,
        }
      );
    }

    // Just return user data
    return new Response(
      JSON.stringify({ message: "Auth Success!", userData}),
      {
        headers: {
          "Set-Cookie": cookie,
        },
        status: 200,
      }
    );

  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ message: "Internal Server Error on Login" }),
      {
        status: 500,
      }
    );
  }
}
