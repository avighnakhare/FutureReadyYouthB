import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function PATCH(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized administrative access required." }, { status: 401 });
    }

    const data = await req.json();
    const { id, status } = data;

    if (!id || !status) {
      return NextResponse.json({ success: false, error: "Missing ID or status parameters." }, { status: 400 });
    }

    const updated = await prisma.volunteer.update({
      where: { id },
      data: { status }
    });

    return NextResponse.json({ success: true, volunteer: updated });
  } catch (error) {
    console.error("Failed to update status", error);
    return NextResponse.json({ success: false, error: "Database update failure." }, { status: 500 });
  }
}
