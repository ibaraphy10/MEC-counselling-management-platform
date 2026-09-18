import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Resetting and seeding MEC Fortitude data for single room and single counsellor...");

  // Clean up existing data to guarantee single room and single counsellor setup
  await prisma.session.deleteMany();
  await prisma.roomStatusHistory.deleteMany();
  await prisma.room.deleteMany();

  // 1. Dedicated Single Counselling Room
  const counsellingRoom = await prisma.room.create({
    data: {
      name: "Fortitude Counselling Room",
      code: "FCR-01",
      location: "Main Block, 2nd Floor, Room 204",
      capacity: 3,
      currentStatus: "AVAILABLE",
    },
  });

  // 2. The College's Dedicated Single Counsellor
  const counsellor = await prisma.user.upsert({
    where: { email: "counsellor@mec.ac.in" },
    update: {
      name: "Dr. Latha Menon",
      role: "COUNSELLOR",
      department: "Student Well-Being & Guidance",
      phone: "+91 98765 43210",
    },
    create: {
      name: "Dr. Latha Menon",
      email: "counsellor@mec.ac.in",
      role: "COUNSELLOR",
      department: "Student Well-Being & Guidance",
      phone: "+91 98765 43210",
    },
  });

  // 3. Core Committee Student Coordinator
  const coreMember = await prisma.user.upsert({
    where: { email: "core.fortitude@mec.ac.in" },
    update: {
      name: "Aditya Verma",
      role: "CORE",
      department: "Computer Science",
      classYear: "4th Year",
      batch: "2021-2025",
    },
    create: {
      name: "Aditya Verma",
      email: "core.fortitude@mec.ac.in",
      role: "CORE",
      department: "Computer Science",
      classYear: "4th Year",
      batch: "2021-2025",
    },
  });

  // 4. Sample Student
  const student = await prisma.user.upsert({
    where: { email: "student.sample@mec.ac.in" },
    update: {
      name: "Ananya Ramesh",
      role: "STUDENT",
      department: "Electronics & Communication",
      classYear: "2nd Year",
      batch: "2023-2027",
    },
    create: {
      name: "Ananya Ramesh",
      email: "student.sample@mec.ac.in",
      role: "STUDENT",
      department: "Electronics & Communication",
      classYear: "2nd Year",
      batch: "2023-2027",
    },
  });

  // 5. Initial Status History for the Counselling Room
  await prisma.roomStatusHistory.create({
    data: {
      roomId: counsellingRoom.id,
      status: "AVAILABLE",
      notes: "Room verified and sanitized for student sessions.",
      changedById: coreMember.id,
    },
  });

  // 6. Sample Booking with the dedicated Counsellor & Room
  await prisma.session.create({
    data: {
      studentId: student.id,
      counsellorId: counsellor.id,
      roomId: counsellingRoom.id,
      status: "CONFIRMED",
      mode: "IN_PERSON",
      sessionType: "Academic Stress Management",
      reason: "Seeking guidance on balancing project deadlines and semester preparation.",
      scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // tomorrow
      durationMinutes: 45,
    },
  });

  console.log("Seed completed successfully!");
  console.log({
    usersCount: await prisma.user.count(),
    counsellorCount: await prisma.user.count({ where: { role: "COUNSELLOR" } }),
    roomsCount: await prisma.room.count(),
    sessionsCount: await prisma.session.count(),
    statusHistoryCount: await prisma.roomStatusHistory.count(),
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
