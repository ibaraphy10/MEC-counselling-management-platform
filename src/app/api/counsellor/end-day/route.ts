import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { undo } = await req.json().catch(() => ({ undo: false }));
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (undo) {
      // Revert cancelled sessions back to CONFIRMED
      // (Assuming we kept a record or just revert all CANCELLED sessions for today)
      await prisma.session.updateMany({
        where: {
          status: 'CANCELLED',
          scheduledAt: { gte: today }
        },
        data: { status: 'CONFIRMED' }
      });
      return NextResponse.json({ success: true, message: "Day-End undone. Sessions restored." });
    }

    // Cancel all remaining confirmed/requested sessions for today
    await prisma.session.updateMany({
      where: {
        status: { in: ['CONFIRMED', 'REQUESTED'] },
        scheduledAt: { gte: today }
      },
      data: { status: 'CANCELLED' } // or 'RESCHEDULED'
    });

    return NextResponse.json({ success: true, message: "Day ended. All remaining sessions cleared." });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to end day' }, { status: 500 });
  }
}
