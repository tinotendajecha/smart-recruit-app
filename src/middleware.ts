import { jwtVerify } from "jose"; // Install with `npm install jose`
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    console.log("Middleware is running");

    const token = req.cookies.get("siteJWT")?.value;

    if (!token) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);

        if (!secret) {
            throw new Error("JWT_SECRET is not defined");
        }

        // Verify the token using `jose`
        await jwtVerify(token, secret);

        return NextResponse.next();
    } catch (error) {
        console.error("JWT verification failed:", error);
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }
}

// Match dynamic paths with a company name followed by /dashboard and anything after it
export const config = {
    matcher: ["/:company/dashboard/:path*", "/:company/dashboard"],
};
