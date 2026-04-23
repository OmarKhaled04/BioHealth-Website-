import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"BioHealth Contact Form" <${process.env.SMTP_USER}>`,
      to: 'Info@lactonic.org',
      replyTo: `"${name}" <${email}>`,
      subject: `[Contact Form] ${subject}`,
      text: `Name: ${name}\nFrom: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <h2 style="color:#5b21b6">New Contact Form Submission</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;font-weight:bold;color:#374151">Name</td><td style="padding:8px 0;color:#111827">${name}</td></tr>
            <tr><td style="padding:8px 0;font-weight:bold;color:#374151">Email</td><td style="padding:8px 0;color:#111827">${email}</td></tr>
            <tr><td style="padding:8px 0;font-weight:bold;color:#374151">Subject</td><td style="padding:8px 0;color:#111827">${subject}</td></tr>
          </table>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0"/>
          <p style="font-weight:bold;color:#374151">Message:</p>
          <p style="color:#111827;white-space:pre-wrap">${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Mail error:', err);
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }
}
