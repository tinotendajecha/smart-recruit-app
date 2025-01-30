import prisma from "@/utils/dbconfig";
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  try {
    // Parse the request body
    const { email } = await req.json();

    // Ensure the email field exists
    if (!email) {
      return new Response(
        JSON.stringify({ message: "Email is required!" }),
        { status: 400 }
      );
    }

    // Generate a 6-digit passcode
    const generatePasscode = () =>
      Math.floor(100000 + Math.random() * 900000).toString();

    const code = generatePasscode();

    // Set the expiry time to 10 minutes from now
    const now = new Date();
    const expiryTime = new Date(now.getTime() + 3 * 60 * 1000); // Add 10 minutes

    console.log("Expiry Time:", expiryTime);

    // Store the passcode in the database
    const save_code = await prisma.verification_Codes.create({
      data: {
        code,
        email,
        expiresAt: expiryTime, // Pass the corrected Date object
      },
    });

    // after saving code, send code to email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or app password
      },
    })

    const htmlTemplate = `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verify Your Email</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f4f4f5; font-family: Arial, sans-serif;">
          <table role="presentation" style="width: 100%; border-collapse: collapse;">
            <tr>
              <td align="center" style="padding: 40px 0;">
                <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: white; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                  <!-- Header -->
                  <tr>
                    <td style="padding: 40px 40px 20px; text-align: center; background-color: #16a34a; border-radius: 8px 8px 0 0;">
                      <h1 style="margin: 0; color: white; font-size: 24px;">
                        Smart<span style="color: #dcfce7;">Recruit</span>
                      </h1>
                    </td>
                  </tr>
                  
                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px;">
                      <h2 style="margin: 0 0 20px; color: #1f2937; font-size: 20px;">Verify Your Email Address</h2>
                      <p style="margin: 0 0 30px; color: #4b5563; line-height: 24px;">
                        Thank you for choosing SmartRecruit. To complete your registration, please use the verification code below:
                      </p>
                      
                      <!-- Verification Code Box -->
                      <div style="background-color: #f0fdf4; border: 2px solid #16a34a; border-radius: 8px; padding: 20px; text-align: center; margin-bottom: 30px;">
                        <span style="font-size: 32px; font-weight: bold; color: #16a34a; letter-spacing: 4px;">${code}</span>
                      </div>
                      
                      <p style="margin: 0 0 10px; color: #4b5563; line-height: 24px;">
                        This code will expire in 3 minutes for security purposes.
                      </p>
                      <p style="margin: 0; color: #6b7280; font-size: 14px;">
                        If you didn't request this verification code, please ignore this email.
                      </p>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="padding: 20px 40px 40px; text-align: center; color: #6b7280; font-size: 14px; border-top: 1px solid #e5e7eb;">
                      <p style="margin: 0 0 10px;">
                        © ${new Date().getFullYear()} SmartRecruit. All rights reserved.
                      </p>
                      <p style="margin: 0;">
                        This is an automated message, please do not reply.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
   `

    // Email options 
    const mailOptions = {
      from: 'Smart Recruit App', // Sender address
      to: email, // Recipient address
      subject: "Your Verification Code", // Subject line
      text: `Your verification code is ${code}. It will expire in 10 minutes.`, // Plain text body
      html: htmlTemplate, // HTML body
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    console.log("Code generated and sent to email successfully!");

    return new Response(
      JSON.stringify({ message: "Code generated successfully!" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error); // Updated logging for better debugging
    return new Response(
      JSON.stringify({ message: "Internal Server Error!" }),
      { status: 500 }
    );
  }
}
