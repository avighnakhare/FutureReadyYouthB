import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!data.name || !data.email || !data.subject || !data.message) {
      return NextResponse.json({ success: false, error: "Missing required contact parameters." }, { status: 400 });
    }

    // Email sending is disabled/removed. Simple success return.
    console.log(`[CONTACT API] Contact submission received from: ${data.name} <${data.email}> regarding "${data.subject}"`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to process contact message", error);
    return NextResponse.json({ success: false, error: "Server gateway failure." }, { status: 500 });
  }
}
