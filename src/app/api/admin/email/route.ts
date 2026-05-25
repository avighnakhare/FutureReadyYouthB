import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendDirectApplicantEmail } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { id, subject, message } = data;

    if (!id || !subject || !message) {
      return NextResponse.json({ success: false, error: "Missing required correspondence parameters." }, { status: 400 });
    }

    const volunteer = await prisma.volunteer.findUnique({
      where: { id }
    });

    if (!volunteer) {
      return NextResponse.json({ success: false, error: "Candidate not found." }, { status: 404 });
    }

    const fullName = `${volunteer.firstName} ${volunteer.lastName}`;

    // Dispatch the email
    const previewUrl = await sendDirectApplicantEmail(
      volunteer.email,
      fullName,
      subject,
      message
    );

    return NextResponse.json({ success: true, previewUrl });
  } catch (error) {
    console.error("Failed to dispatch correspondence", error);
    return NextResponse.json({ success: false, error: "Correspondence dispatch failure." }, { status: 500 });
  }
}
