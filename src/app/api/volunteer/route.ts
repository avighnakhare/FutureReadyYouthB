import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Serverside validations
    if (
      !data.firstName || 
      !data.lastName || 
      !data.email || 
      !data.phoneNumber || 
      !data.dateOfBirth || 
      !data.city || 
      !data.state || 
      !data.reasonToVolunteer || 
      !data.skillsToContribute || 
      !data.availability || 
      !data.hoursMonthly || 
      !data.preferredRole || 
      data.consent === undefined
    ) {
      return NextResponse.json({ success: false, error: "Missing required application parameters." }, { status: 400 });
    }

    // Save in SQLite DB
    const volunteer = await prisma.volunteer.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        dateOfBirth: data.dateOfBirth,
        city: data.city,
        state: data.state,
        schoolOrOrg: data.schoolOrOrg || null,
        gradeLevel: data.gradeLevel || null,
        occupation: data.occupation || null,
        reasonToVolunteer: data.reasonToVolunteer,
        skillsToContribute: data.skillsToContribute,
        volunteerExperience: data.volunteerExperience || null,
        availability: data.availability,
        hoursMonthly: data.hoursMonthly,
        preferredRole: data.preferredRole,
        additionalComments: data.additionalComments || null,
        consent: data.consent,
        status: "New" // Default to New
      },
    });

    console.log(`[VOLUNTEER API] Registered new volunteer in database: ${data.firstName} ${data.lastName}`);

    return NextResponse.json({ 
      success: true, 
      volunteer
    });
  } catch (error) {
    console.error("Failed to save volunteer", error);
    return NextResponse.json({ success: false, error: "Server Database Failure." }, { status: 500 });
  }
}
