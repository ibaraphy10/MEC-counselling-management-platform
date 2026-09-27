import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Generate Duty Leave list for participating students for today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const completedSessions = await prisma.session.findMany({
      where: {
        status: 'COMPLETED',
        scheduledAt: { gte: today }
      },
      include: { student: true }
    });

    const dutyLeaveList = completedSessions.map(session => ({
      name: session.student.name,
      department: session.student.department,
      batch: session.student.batch,
      time: session.scheduledAt
    }));

    // Generate CSV
    const header = "Name,Department,Batch,Time\n";
    const csv = header + dutyLeaveList.map(row => 
      `"${row.name}","${row.department}","${row.batch}","${row.time.toISOString()}"`
    ).join("\n");

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="duty_leave_list.csv"'
      }
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to generate Duty Leave list' }, { status: 500 });
  }
}
