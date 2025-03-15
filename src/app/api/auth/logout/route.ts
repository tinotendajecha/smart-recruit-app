export async function POST(req: Request) {
    try {
      // Clear the authentication cookie
      return new Response(JSON.stringify({ message: "Logged out successfully" }), {
        status: 200,
        headers: {
          "Set-Cookie":
            "siteJWT=; Path=/; HttpOnly; Secure; SameSite=Strict; Expires=Thu, 01 Jan 1970 00:00:00 GMT",
        },
      });
    } catch (error) {
      console.error("Error logging out:", error);
      return new Response(JSON.stringify({ message: "Internal server error!" }), {
        status: 500,
      });
    }
  }
  