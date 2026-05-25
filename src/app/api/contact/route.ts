import { NextResponse } from "next/server";
import { sendTeamAlertEmail, sendConfirmationEmail } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!data.name || !data.email || !data.subject || !data.message) {
      return NextResponse.json({ success: false, error: "Missing required contact parameters." }, { status: 400 });
    }

    // Professional HTML Layout for Admin Alert
    const adminHtml = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #0F172A; border: 1px solid #E2E8F0; border-radius: 12px; overflow: hidden;">
        <div style="background: #1E40AF; padding: 2rem; color: #FFFFFF; text-align: center;">
          <h2 style="margin: 0; font-size: 20px;">New Website Contact Message</h2>
          <p style="margin: 5px 0 0; font-size: 14px; opacity: 0.9;">Subject: ${data.subject}</p>
        </div>
        <div style="padding: 2.5rem; line-height: 1.6;">
          <p><strong>From:</strong> ${data.name} (<a href="mailto:${data.email}">${data.email}</a>)</p>
          <p><strong>Subject:</strong> ${data.subject}</p>
          <br />
          <h4 style="margin: 0 0 5px; color: #1E40AF;">Message Body:</h4>
          <div style="white-space: pre-wrap; background: #F8FAFC; padding: 1.5rem; border-radius: 8px; border: 1px solid #E2E8F0; font-size: 14px;">${data.message}</div>
          <br />
          <div style="border-top: 1px solid #E2E8F0; padding-top: 1rem; margin-top: 1.5rem; font-size: 11px; color: #64748B;">
            Sent via Future Ready Youth contact portal.
          </div>
        </div>
      </div>
    `;

    // Alert the Team
    await sendTeamAlertEmail(
      `New Website Message: ${data.subject} (From: ${data.name})`,
      adminHtml
    );

    // Send copy confirmation back to sender
    const previewUrl = await sendTeamAlertEmail(
      `Message Received – Future Ready Youth`,
      `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #0F172A; border: 1px solid #E2E8F0; border-radius: 12px; overflow: hidden;">
          <div style="background: #1E40AF; padding: 2rem; color: #FFFFFF; text-align: center;">
            <h2 style="margin: 0; font-size: 20px;">Message Received!</h2>
            <p style="margin: 5px 0 0; font-size: 14px; opacity: 0.95;">Future Ready Youth Team</p>
          </div>
          <div style="padding: 2.5rem; line-height: 1.6;">
            <h3>Hello ${data.name},</h3>
            <p>Thank you for getting in touch with Future Ready Youth!</p>
            <p>This is an automated copy confirming that we have successfully received your inquiry regarding <strong>"${data.subject}"</strong>. A representative from our program office will review your message and reply within 24 hours.</p>
            <p>Below is a copy of your submitted message:</p>
            <div style="white-space: pre-wrap; background: #F8FAFC; padding: 1rem; border-radius: 6px; border: 1px solid #E2E8F0; font-size: 13px; color: #475569;">${data.message}</div>
            <br />
            <div style="border-top: 1px solid #E2E8F0; padding-top: 1.5rem; font-size: 13px; color: #64748B;">
              Best regards,<br />
              <strong>Future Ready Youth Coordinators Team</strong>
            </div>
          </div>
        </div>
      `
    );

    return NextResponse.json({ success: true, previewUrl });
  } catch (error) {
    console.error("Failed to send contact message", error);
    return NextResponse.json({ success: false, error: "Server messaging gateway failure." }, { status: 500 });
  }
}
