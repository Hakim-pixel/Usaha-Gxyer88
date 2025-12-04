import { Resend } from "resend";

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `Keluhan Baru dari ${name}`,
      text: `
Nama: ${name}
Email: ${email}
Pesan:
${message}
      `,
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error("Email error:", err);
    return Response.json({ success: false });
  }
}
