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

    


    // Just return user data
    return new Response(JSON.stringify({ message: "Job Created!" }));

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
