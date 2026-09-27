import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { google } from 'googleapis';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    // 1. Scrub historical database records (strike off students who had a session in the last 2 weeks)
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

    const recentSessions = await prisma.session.findMany({
      where: {
        scheduledAt: { gte: twoWeeksAgo },
        status: 'COMPLETED'
      }
    });
    
    const recentStudentIds = recentSessions.map(s => s.studentId);

    // 2. Pull form submissions from Google Sheets (Placeholder for Google Sheets API integration)
    // You'd need a Service Account JSON and the Spreadsheet ID
    // const auth = new google.auth.GoogleAuth({
    //   scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    // });
    // const sheets = google.sheets({ version: 'v4', auth });
    // const response = await sheets.spreadsheets.values.get({ spreadsheetId: 'YOUR_SHEET_ID', range: 'Sheet1!A2:E' });
    // const rows = response.data.values;
    
    // Simulating pulled RSVPs:
    const pendingRSVPs = await prisma.session.findMany({
      where: {
        status: 'REQUESTED',
        studentId: { notIn: recentStudentIds }
      }
    });

    // Prioritize 'ASAP' cases, followed by 'within a week' backlog RSVPs
    // Assuming 'reason' or a new field indicates urgency. For now, we'll sort by createdAt
    const sortedRSVPs = pendingRSVPs.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

    // 3. Dynamic Schedule Configuration
    const config = await prisma.scheduleConfig.findFirst();
    if (!config) throw new Error("Schedule configuration not found");

    // Allot slots
    // Parse times
    const parseTime = (timeStr: string) => {
      const [h, m] = timeStr.split(':').map(Number);
      return h * 60 + m;
    };

    let currentTime = parseTime(config.startTime);
    const endTime = parseTime(config.endTime);
    const lunchStart = parseTime(config.lunchStartTime);
    const lunchEnd = lunchStart + config.lunchDurationMin;

    const allottedSlots = [];
    
    // Today's date at 00:00:00
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (const rsvp of sortedRSVPs) {
      if (currentTime >= endTime) break;

      // Skip lunch break
      if (currentTime >= lunchStart && currentTime < lunchEnd) {
        currentTime = lunchEnd;
      }

      if (currentTime + config.slotDurationMin <= endTime) {
        // Schedule it
        const scheduledTime = new Date(today);
        scheduledTime.setHours(Math.floor(currentTime / 60), currentTime % 60, 0, 0);

        await prisma.session.update({
          where: { id: rsvp.id },
          data: {
            scheduledAt: scheduledTime,
            durationMinutes: config.slotDurationMin,
            status: 'CONFIRMED'
          }
        });

        allottedSlots.push({
          sessionId: rsvp.id,
          studentId: rsvp.studentId,
          time: scheduledTime
        });

        currentTime += config.slotDurationMin;
      }
    }

    // 4. Sync generated list assignments back to Google Sheets (Placeholder)
    // await sheets.spreadsheets.values.update({ ... });

    return NextResponse.json({ success: true, message: "Scheduling completed", allottedSlots });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to schedule" }, { status: 500 });
  }
}
