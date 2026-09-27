import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { deviceName, ipAddress } = await req.json();

    // In a real application, you would send an email here using a service like Resend, SendGrid, or Nodemailer
    // e.g., sendEmail('core.fortitude@mec.ac.in', `New login detected from ${deviceName} (${ipAddress})`);
    
    console.log(`SECURITY ALERT: New Core Dashboard login detected from ${deviceName} at IP: ${ipAddress}`);
    // This email will ONLY be sent to the core email, not shown in the app.

    return NextResponse.json({ success: true, message: "Security alert email triggered." });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to trigger alert' }, { status: 500 });
  }
}
