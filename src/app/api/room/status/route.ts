import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  const rooms = await prisma.room.findMany();
  return NextResponse.json(rooms);
}

export async function PUT(req: Request) {
  try {
    const { roomId, status, notes, changedById } = await req.json();

    const room = await prisma.room.update({
      where: { id: roomId },
      data: { currentStatus: status },
    });

    await prisma.roomStatusHistory.create({
      data: {
        roomId,
        status,
        notes,
        changedById,
      },
    });

    return NextResponse.json({ success: true, room });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update status' }, { status: 500 });
  }
}
