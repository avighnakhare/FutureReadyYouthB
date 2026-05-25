import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyPassword, createSession } from "@/lib/auth";
import { initializeDatabase } from "@/lib/init";

export async function POST(req: Request) {
  try {
    // Self-healing database initialization ensure
    await initializeDatabase();

    const data = await req.json();
    const { username, password } = data;

    if (!username || !password) {
      return NextResponse.json({ success: false, error: "Username and password are required." }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { username }
    });

    if (!user) {
      return NextResponse.json({ success: false, error: "Invalid administrative credentials." }, { status: 401 });
    }

    // Verify Password scrypt signature
    const isValid = verifyPassword(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json({ success: false, error: "Invalid administrative credentials." }, { status: 401 });
    }

    // Create session cookie
    await createSession(user.id);

    return NextResponse.json({
      success: true,
      mustChangePassword: user.mustChangePassword
    });
  } catch (error) {
    console.error("Login route error", error);
    return NextResponse.json({ success: false, error: "Internal authentication failure." }, { status: 500 });
  }
}
