import prisma from "@/utils/dbconfig";

export async function POST(req: Request) {
  try {
    // Parse the request body
    const { email, code } = await req.json();

    // Validate input
    if (!email || !code) {
      return new Response(
        JSON.stringify({ 
          success: false,
          message: "Email and verification code are required!" 
        }),
        { status: 400 }
      );
    }

    // Find the most recent verification code for this email
    const verificationCode = await prisma.verification_Codes.findFirst({
      where: {
        email,
        code,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Check if code exists
    if (!verificationCode) {
      return new Response(
        JSON.stringify({ 
          success: false,
          message: "Invalid verification code!" 
        }),
        { status: 400 }
      );
    }

    // Check if code has expired
    const now = new Date();
    if (now > verificationCode.expiresAt) {
      return new Response(
        JSON.stringify({ 
          success: false,
          message: "Verification code has expired!" 
        }),
        { status: 400 }
      );
    }

    // Mark the code as used to prevent reuse
    // await prisma.verification_Codes.update({
    //   where: {
    //     id: verificationCode.id
    //   },
    //   data: {
    //     used: true
    //   }
    // });

    // Update user's email verification status if needed
    // This assumes you have a users table with an emailVerified field
    await prisma.user.update({
      where: {
        email
      },
      data: {
        isEmailVerified: true
      }
    });

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        message: "Email verified successfully!",
      }),
      { status: 200 }
    );

  } catch (error) {
    console.error("Error verifying code:", error);
    return new Response(
      JSON.stringify({ 
        success: false,
        message: "Internal Server Error!" 
      }),
      { status: 500 }
    );
  }
}