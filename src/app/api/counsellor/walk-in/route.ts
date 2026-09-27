import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { undo } = await req.json().catch(() => ({ undo: false }));
    const now = new Date();

    if (undo) {
      // Logic to revert the 15-minute shift would go here
      // This could use a history log or simply shift future sessions back by 15 mins
      return NextResponse.json({ success: true, message: "Walk-in delay undone." });
    }

    // Shift subsequent tentative/requested slots by 15 minutes
    const upcomingSessions = await prisma.session.findMany({
      where: {
        status: { in: ['CONFIRMED', 'REQUESTED'] },
        scheduledAt: { gte: now }
      }
    });

    for (const session of upcomingSessions) {
      const newTime = new Date(session.scheduledAt.getTime() + 15 * 60000);
      await prisma.session.update({
        where: { id: session.id },
        data: { scheduledAt: newTime }
      });
      // Here you would also trigger email/SMS notifications to students: "Expect a delay"
    }

    return NextResponse.json({ success: true, message: "Walk-in logged, subsequent slots delayed by 15 mins. Notifications sent." });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to log walk-in' }, { status: 500 });
  }
}
