import nodemailer from 'nodemailer';

// Uses Gmail if available via ENV vars, otherwise falls back to Ethereal mock
async function getTransporter() {
  if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });
  }

  // Fallback testing Ethereal account
  let testAccount = await nodemailer.createTestAccount();
  return nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
}

const FROM_EMAIL = '"Future Ready Youth" <futurereadyyouth6@gmail.com>';
const TO_TEAM_EMAIL = 'futurereadyyouth6@gmail.com';

// 1. APPLICANT CONFIRMATION EMAIL
export async function sendConfirmationEmail(to: string, name: string) {
  try {
    const transporter = await getTransporter();

    let info = await transporter.sendMail({
      from: FROM_EMAIL,
      to: to,
      subject: "Application Received – Future Ready Youth",
      text: `Thank you for applying to volunteer with Future Ready Youth.

We have successfully received your application and our team will review it shortly.

If your qualifications align with our current opportunities, we will contact you regarding next steps and a possible interview.

Thank you for helping us empower the next generation of leaders.

Future Ready Youth Team`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #0F172A; border: 1px solid #E2E8F0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
          <div style="background: linear-gradient(135deg, #1E40AF, #1D4ED8); padding: 2.5rem; text-align: center; color: #FFFFFF;">
            <h1 style="margin: 0; font-size: 24px; font-weight: 800; letter-spacing: 0.5px;">Future Ready Youth</h1>
            <p style="margin: 5px 0 0; font-size: 14px; opacity: 0.9;">Empowering Students. Inspiring Change.</p>
          </div>
          <div style="padding: 2.5rem; line-height: 1.6; font-size: 15px;">
            <h3 style="margin-top: 0; color: #1E40AF; font-size: 18px;">Hello ${name},</h3>
            <p>Thank you for applying to volunteer with Future Ready Youth.</p>
            <p>We have successfully received your application and our team will review it shortly.</p>
            <p>If your qualifications align with our current opportunities, we will contact you regarding next steps and a possible interview.</p>
            <p>Thank you for helping us empower the next generation of leaders.</p>
            <br />
            <div style="border-top: 1px solid #E2E8F0; padding-top: 1.5rem; margin-top: 1.5rem; font-size: 14px; color: #64748B;">
              <strong>With gratitude,</strong><br />
              <span style="color: #1E40AF; font-weight: 600;">Future Ready Youth Team</span>
            </div>
          </div>
        </div>
      `,
    });

    console.log("Confirmation Email sent: %s", info.messageId);
    return (transporter.options as any).host !== 'smtp.gmail.com' ? nodemailer.getTestMessageUrl(info) : null;
  } catch (error) {
    console.error("Error sending confirmation email", error);
    return null;
  }
}

// 2. ADMIN TEAM ALERT EMAIL
export async function sendTeamAlertEmail(subject: string, htmlBody: string) {
  try {
    const transporter = await getTransporter();

    let info = await transporter.sendMail({
      from: FROM_EMAIL,
      to: TO_TEAM_EMAIL,
      subject: subject,
      html: htmlBody,
    });

    console.log("Team Alert sent: %s", info.messageId);
    return (transporter.options as any).host !== 'smtp.gmail.com' ? nodemailer.getTestMessageUrl(info) : null;
  } catch (error) {
    console.error("Error sending team alert email", error);
    return null;
  }
}

// 3. DIRECT CUSTOM COORDINATOR EMAIL TO APPLICANTS FROM DASHBOARD
export async function sendDirectApplicantEmail(to: string, name: string, subject: string, messageText: string) {
  try {
    const transporter = await getTransporter();

    let info = await transporter.sendMail({
      from: FROM_EMAIL,
      to: to,
      subject: `${subject} – Future Ready Youth`,
      text: `Hi ${name},\n\n${messageText}\n\nBest,\nFuture Ready Youth Team`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #0F172A; border: 1px solid #E2E8F0; border-radius: 12px; overflow: hidden;">
          <div style="background: #1E40AF; padding: 1.5rem; color: #FFFFFF;">
            <h2 style="margin: 0; font-size: 18px;">Future Ready Youth Coordinator Correspondence</h2>
          </div>
          <div style="padding: 2rem; line-height: 1.6; font-size: 15px;">
            <p>Dear <strong>${name}</strong>,</p>
            <p style="white-space: pre-wrap; background: #F8FAFC; padding: 1.5rem; border-radius: 8px; border: 1px solid #E2E8F0;">${messageText}</p>
            <br />
            <p>Best regards,</p>
            <p><strong>Future Ready Youth Coordinators Team</strong></p>
          </div>
        </div>
      `,
    });

    console.log("Direct correspondence sent: %s", info.messageId);
    return (transporter.options as any).host !== 'smtp.gmail.com' ? nodemailer.getTestMessageUrl(info) : null;
  } catch (error) {
    console.error("Error sending direct applicant email", error);
    return null;
  }
}
