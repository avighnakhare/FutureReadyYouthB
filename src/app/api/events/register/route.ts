import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { eventId, fullName, email } = data;

    if (!eventId || !fullName || !email) {
      return NextResponse.json({ success: false, error: "Missing required registration parameters." }, { status: 400 });
    }

    // Fetch the event
    const event = await prisma.event.findUnique({
      where: { id: eventId }
    });

    if (!event) {
      return NextResponse.json({ success: false, error: "Target event not found." }, { status: 404 });
    }

    if (event.spotsLeft <= 0) {
      return NextResponse.json({ success: false, error: "This event is currently fully booked!" }, { status: 400 });
    }

    // Transaction to insert registration and update spotsLeft in event
    const [registration] = await prisma.$transaction([
      prisma.eventRegistration.create({
        data: {
          eventId,
          fullName,
          email
        }
      }),
      prisma.event.update({
        where: { id: eventId },
        data: {
          spotsLeft: event.spotsLeft - 1
        }
      })
    ]);

    return NextResponse.json({ success: true, registration });
  } catch (error) {
    console.error("Failed to register for event", error);
    return NextResponse.json({ success: false, error: "Database transaction failure." }, { status: 500 });
  }
}
