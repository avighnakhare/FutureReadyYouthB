// purely mock mail utility to completely disable SMTP/nodemailer connections for Vercel deployment.

export async function sendConfirmationEmail(to: string, name: string) {
  console.log(`[MAIL MOCK] Confirmation email requested for: ${name} <${to}>`);
  return null;
}

export async function sendTeamAlertEmail(subject: string, htmlBody: string) {
  console.log(`[MAIL MOCK] Team alert email requested: "${subject}"`);
  return null;
}

export async function sendDirectApplicantEmail(to: string, name: string, subject: string, messageText: string) {
  console.log(`[MAIL MOCK] Direct email requested for: ${name} <${to}> with subject: "${subject}"`);
  return null;
}
