import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

// 1. Create Event (POST)
export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized administrative access." }, { status: 401 });
    }

    const data = await req.json();
    const { title, category, date, time, location, description, host, capacity } = data;

    if (!title || !category || !date || !time || !location || !description || !host || !capacity) {
      return NextResponse.json({ success: false, error: "Missing required event fields." }, { status: 400 });
    }

    const event = await prisma.event.create({
      data: {
        title,
        category,
        date,
        time,
        location,
        description,
        host,
        capacity: Math.max(1, parseInt(capacity) || 20),
        spotsLeft: Math.max(1, parseInt(capacity) || 20)
      }
    });

    return NextResponse.json({ success: true, event });
  } catch (error) {
    console.error("Create event error", error);
    return NextResponse.json({ success: false, error: "Event creation failure." }, { status: 500 });
  }
}

// 2. Edit Event (PUT)
export async function PUT(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized administrative access." }, { status: 401 });
    }

    const data = await req.json();
    const { id, title, category, date, time, location, description, host, capacity } = data;

    if (!id || !title || !category || !date || !time || !location || !description || !host || !capacity) {
      return NextResponse.json({ success: false, error: "Missing required event update parameters." }, { status: 400 });
    }

    // Load current event to calculate spotsLeft
    const existing = await prisma.event.findUnique({
      where: { id },
      include: { registration: true }
    });

    if (!existing) {
      return NextResponse.json({ success: false, error: "Event not found." }, { status: 404 });
    }

    const regCount = existing.registration.length;
    const newCapacity = Math.max(1, parseInt(capacity) || 20);
    const newSpotsLeft = Math.max(0, newCapacity - regCount);

    const event = await prisma.event.update({
      where: { id },
      data: {
        title,
        category,
        date,
        time,
        location,
        description,
        host,
        capacity: newCapacity,
        spotsLeft: newSpotsLeft
      }
    });

    return NextResponse.json({ success: true, event });
  } catch (error) {
    console.error("Update event error", error);
    return NextResponse.json({ success: false, error: "Event update failure." }, { status: 500 });
  }
}

// 3. Delete Event (DELETE)
export async function DELETE(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized administrative access." }, { status: 401 });
    }

    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing Event ID parameter." }, { status: 400 });
    }

    await prisma.event.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete event error", error);
    return NextResponse.json({ success: false, error: "Event deletion failure." }, { status: 500 });
  }
}
