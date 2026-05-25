import { NextResponse } from "next/server";
import { destroySession } from "@/lib/auth";

export async function POST() {
  try {
    await destroySession();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Logout route error", error);
    return NextResponse.json({ success: false, error: "Internal logout failure." }, { status: 500 });
  }
}
