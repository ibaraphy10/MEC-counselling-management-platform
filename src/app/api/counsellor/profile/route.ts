import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
  try {
    const counsellor = await prisma.user.findFirst({
      where: { role: "COUNSELLOR" },
    });
    return NextResponse.json({ counsellor });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch counsellor profile" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await auth();
    if (!session?.user || (session.user.role !== "COUNSELLOR" && session.user.role !== "CORE")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await req.json();
    const { name, designation, department, phone, email, linkedin } = body;

    const currentCounsellor = await prisma.user.findFirst({
      where: { role: "COUNSELLOR" },
    });

    if (!currentCounsellor) {
      return NextResponse.json({ error: "Counsellor not found" }, { status: 404 });
    }

    const updated = await prisma.user.update({
      where: { id: currentCounsellor.id },
      data: {
        name: name || currentCounsellor.name,
        designation: designation !== undefined ? designation : currentCounsellor.designation,
        department: department !== undefined ? department : currentCounsellor.department,
        phone: phone !== undefined ? phone : currentCounsellor.phone,
        email: email || currentCounsellor.email,
        linkedin: linkedin !== undefined ? linkedin : currentCounsellor.linkedin,
      },
    });

    return NextResponse.json({ success: true, counsellor: updated });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update counsellor profile" }, { status: 500 });
  }
}
