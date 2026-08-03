import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // 1. Restrict to POST requests only
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  // 2. Destructure data sent from your React frontend
  const { name, email, message } = req.body;

  // Basic validation check
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  try {
    // 3. Trigger Resend API
    const data = await resend.emails.send({
      // Use 'onboarding@resend.dev' until you verify a custom domain
      from: 'Portfolio Contact <onboarding@resend.dev>',
      // Put YOUR actual personal inbox address here:
      to: ["andysputedkoech@gmail.com"],
      // Sets the sender's email as the 'Reply-To' so hitting reply goes straight to them
      replyTo: email,
      subject: `New Portfolio Inquiry from ${name}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; line-height: 1.5; color: #333;">
          <h2 style="color: #000; border-bottom: 2px solid #eee; padding-bottom: 8px;">
            New Contact Form Submission
          </h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <blockquote style="background: #f9f9f9; padding: 12px 16px; border-left: 4px solid #333; margin: 0;">
            ${message.replace(/\n/g, '<br/>')}
          </blockquote>
        </div>
      `,
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}