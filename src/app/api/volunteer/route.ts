import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendConfirmationEmail, sendTeamAlertEmail } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Rigorous serverside validations
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

    const fullName = `${data.firstName} ${data.lastName}`;

    // Send applicant confirmation email
    const previewUrl = await sendConfirmationEmail(data.email, data.firstName);
    
    // Construct Admin alert HTML Body detailing all 18+ fields professionally
    const adminHtml = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 650px; margin: 0 auto; color: #0F172A; border: 1px solid #E2E8F0; border-radius: 12px; overflow: hidden;">
        <div style="background: #EA580C; padding: 2rem; color: #FFFFFF; text-align: center;">
          <h2 style="margin: 0; font-size: 20px;">New Volunteer Registration</h2>
          <p style="margin: 5px 0 0; font-size: 14px; opacity: 0.95;">Candidate: ${fullName}</p>
        </div>
        <div style="padding: 2.5rem; line-height: 1.6;">
          <h3 style="border-bottom: 2px solid #F1F5F9; padding-bottom: 5px; color: #EA580C;">Candidate Profile Details</h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 1.5rem;">
            <tr style="border-bottom: 1px solid #F1F5F9;"><td style="padding: 8px 0; font-weight: bold; width: 40%;">First Name:</td><td style="padding: 8px 0;">${data.firstName}</td></tr>
            <tr style="border-bottom: 1px solid #F1F5F9;"><td style="padding: 8px 0; font-weight: bold;">Last Name:</td><td style="padding: 8px 0;">${data.lastName}</td></tr>
            <tr style="border-bottom: 1px solid #F1F5F9;"><td style="padding: 8px 0; font-weight: bold;">Email Address:</td><td style="padding: 8px 0;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
            <tr style="border-bottom: 1px solid #F1F5F9;"><td style="padding: 8px 0; font-weight: bold;">Phone Number:</td><td style="padding: 8px 0;"><a href="tel:${data.phoneNumber}">${data.phoneNumber}</a></td></tr>
            <tr style="border-bottom: 1px solid #F1F5F9;"><td style="padding: 8px 0; font-weight: bold;">Date of Birth:</td><td style="padding: 8px 0;">${data.dateOfBirth}</td></tr>
            <tr style="border-bottom: 1px solid #F1F5F9;"><td style="padding: 8px 0; font-weight: bold;">City / State:</td><td style="padding: 8px 0;">${data.city}, ${data.state}</td></tr>
            <tr style="border-bottom: 1px solid #F1F5F9;"><td style="padding: 8px 0; font-weight: bold;">School / Organization:</td><td style="padding: 8px 0;">${data.schoolOrOrg || "Not provided"}</td></tr>
            <tr style="border-bottom: 1px solid #F1F5F9;"><td style="padding: 8px 0; font-weight: bold;">Grade Level:</td><td style="padding: 8px 0;">${data.gradeLevel || "Not student"}</td></tr>
            <tr style="border-bottom: 1px solid #F1F5F9;"><td style="padding: 8px 0; font-weight: bold;">Occupation:</td><td style="padding: 8px 0;">${data.occupation || "Not provided"}</td></tr>
            <tr style="border-bottom: 1px solid #F1F5F9;"><td style="padding: 8px 0; font-weight: bold;">General Availability:</td><td style="padding: 8px 0; color: #1E40AF; font-weight: 600;">${data.availability}</td></tr>
            <tr style="border-bottom: 1px solid #F1F5F9;"><td style="padding: 8px 0; font-weight: bold;">Hours Available Monthly:</td><td style="padding: 8px 0; color: #059669; font-weight: 600;">${data.hoursMonthly}</td></tr>
            <tr style="border-bottom: 1px solid #F1F5F9;"><td style="padding: 8px 0; font-weight: bold;">Preferred Program Role:</td><td style="padding: 8px 0; color: #D97706; font-weight: 600;">${data.preferredRole}</td></tr>
          </table>

          <h3 style="border-bottom: 2px solid #F1F5F9; padding-bottom: 5px; color: #EA580C; margin-top: 2rem;">Motivations & Intentions</h3>
          <p style="background: #F8FAFC; padding: 12px; border-radius: 6px; border: 1px solid #E2E8F0; font-size: 13px;">
            <strong>Why do you want to volunteer?</strong><br />
            ${data.reasonToVolunteer}
          </p>
          <p style="background: #F8FAFC; padding: 12px; border-radius: 6px; border: 1px solid #E2E8F0; font-size: 13px; margin-top: 1rem;">
            <strong>What skills can you contribute?</strong><br />
            ${data.skillsToContribute}
          </p>
          <p style="background: #F8FAFC; padding: 12px; border-radius: 6px; border: 1px solid #E2E8F0; font-size: 13px; margin-top: 1rem;">
            <strong>Previous Experience:</strong><br />
            ${data.volunteerExperience || "None provided"}
          </p>
          <p style="background: #F8FAFC; padding: 12px; border-radius: 6px; border: 1px solid #E2E8F0; font-size: 13px; margin-top: 1rem;">
            <strong>Additional Comments:</strong><br />
            ${data.additionalComments || "None"}
          </p>

          <div style="border-top: 1px solid #E2E8F0; padding-top: 1rem; margin-top: 2rem; font-size: 12px; color: #64748B;">
            Consent Checkbox Agreed: ${data.consent ? "YES" : "NO"} &bull; Status: New
          </div>
        </div>
      </div>
    `;

    // Alert the Team
    await sendTeamAlertEmail(
      `New Volunteer Sign-Up: ${fullName} (${data.preferredRole})`,
      adminHtml
    );

    return NextResponse.json({ 
      success: true, 
      volunteer,
      previewUrl 
    });
  } catch (error) {
    console.error("Failed to save volunteer", error);
    return NextResponse.json({ success: false, error: "Server Database Failure." }, { status: 500 });
  }
}
