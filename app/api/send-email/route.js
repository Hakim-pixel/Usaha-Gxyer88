import { Resend } from "resend";

export async function POST(req) {
  try {
    let name, email, message;
    let attachments;

    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      // If the client sent a FormData (with a file)
      const formData = await req.formData();
      name = formData.get("name");
      email = formData.get("email");
      message = formData.get("message");

      const file = formData.get("photo");
      if (file && file.size) {
        // Server-side validation for size and type
        const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
        const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/jpg"];

        if (!allowedTypes.includes(file.type)) {
          console.error("[send-email] rejected file: type not allowed", file.type);
          return Response.json({ success: false, error: "FILE_TYPE_NOT_ALLOWED" });
        }

        if (file.size > MAX_FILE_SIZE) {
          console.error("[send-email] rejected file: too large", file.size);
          return Response.json({ success: false, error: "FILE_TOO_LARGE" });
        }

        const arrayBuffer = await file.arrayBuffer();
        const base64 = Buffer.from(arrayBuffer).toString("base64");
        attachments = [
          {
            filename: file.name || "photo.jpg",
            type: file.type || "image/jpeg",
            data: base64,
          },
        ];
      }
    } else {
      const body = await req.json();
      name = body.name;
      email = body.email;
      message = body.message;
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("[send-email] MISSING RESEND_API_KEY");
      return Response.json({ success: false, error: "MISSING_RESEND_API_KEY" });
    }

    if (!process.env.EMAIL_TO) {
      console.error("[send-email] MISSING EMAIL_TO");
      return Response.json({ success: false, error: "MISSING_EMAIL_TO" });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `Keluhan Baru dari ${name}`,
      text: `Nama: ${name}\nEmail: ${email}\nPesan:\n${message}`,
    };

    if (attachments) {
      // Resend requires attachments to have either `content` (base64) or `path`.
      // Use `content` with base64 data and specify encoding for clarity.
      mailOptions.attachments = attachments.map((a) => ({
        filename: a.filename,
        type: a.type,
        content: a.data,
        encoding: "base64",
      }));
    }

    // Debug logs to help diagnose deliverability issues
    console.log("[send-email] sending email", {
      to: mailOptions.to,
      from: mailOptions.from,
      subject: mailOptions.subject,
      hasAttachments: !!mailOptions.attachments,
      attachmentsInfo: mailOptions.attachments ? mailOptions.attachments.map((a) => ({ filename: a.filename, type: a.type, sizeBase64: a.data?.length })) : undefined,
    });

    const result = await resend.emails.send(mailOptions);
    console.log("[send-email] resend result:", result);

    // Return SDK result for easier local debugging
    return Response.json({ success: true, result });
  } catch (err) {
    console.error("Email error:", err);
    return Response.json({ success: false, error: err?.message || String(err) });
  }
}
