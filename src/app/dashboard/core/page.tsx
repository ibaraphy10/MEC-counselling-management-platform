import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft, Download, Sliders, Users, Building, ShieldCheck } from "lucide-react";
import CounsellorProfileEditor from "@/components/CounsellorProfileEditor";

export const dynamic = "force-dynamic";

export default async function CoreDashboardPage() {
  const session = await auth();

  const [counsellor, counsellingRoom, scheduleConfig, allSessions] = await Promise.all([
    prisma.user.findFirst({
      where: { role: "COUNSELLOR" },
    }),
    prisma.room.findFirst({
      where: { name: { contains: "Sick Room" } },
    }),
    prisma.scheduleConfig.findFirst(),
    prisma.session.findMany({
      include: {
        student: true,
      },
      orderBy: { scheduledAt: "desc" },
    }),
  ]);

  const counsellorData = counsellor || {
    name: "Babu Mathews",
    email: "counsellor@mec.ac.in",
    phone: "+91 98765 43210",
    designation: "Campus Counsellor",
    department: "Student Well-Being & Guidance",
    linkedin: "https://linkedin.com/in/babu-mathews",
  };

  return (
    <div className="min-h-screen bg-[#FCF9EA] text-[#2D3748]">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-[#E8E5D5] bg-[#FCF9EA]/90 backdrop-blur-xs">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-teal-950 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium">
            <span className="rounded-full bg-[#FFBDBD]/60 px-3 py-1 font-semibold text-slate-900">
              Core Committee Console
            </span>
            <span className="text-slate-600">{session?.user?.name || "Core Member"}</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 space-y-6">
        {/* Core Overview Banner */}
        <div className="rounded-3xl bg-white border border-[#E8E5D5] p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-800">
                Administration & Operations
              </span>
              <h1 className="text-2xl font-bold text-[#2D3748] mt-0.5">
                Fortitude Core Management
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Duty leave generation, dynamic room schedules, and verified counsellor configuration
              </p>
            </div>

            {/* Duty Leave CSV Download */}
            <a
              href="/api/core/duty-leave"
              download
              className="inline-flex items-center gap-2 rounded-xl bg-[#BADFDB] px-4 py-2.5 text-xs font-bold text-teal-950 hover:bg-[#a9d7d2] transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Download Duty Leave CSV</span>
            </a>
          </div>
        </div>

        {/* Schedule & Room Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Room Status Management */}
          <div className="rounded-3xl bg-white border border-[#E8E5D5] p-6">
            <div className="flex items-center gap-2.5 mb-4">
              <Building className="h-5 w-5 text-teal-800" />
              <h2 className="text-base font-bold text-[#2D3748]">
                Sick Room Cabin Status
              </h2>
            </div>
            <div className="rounded-2xl bg-[#FCF9EA] border border-[#E8E5D5] p-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Cabin Location:</span>
                <span className="font-semibold text-slate-700">{counsellingRoom?.location}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Current Occupancy:</span>
                <span className="rounded-full bg-[#BADFDB] px-2.5 py-0.5 text-[10px] font-bold text-teal-950">
                  {counsellingRoom?.currentStatus || "VACANT_OPEN"}
                </span>
              </div>
            </div>
          </div>

          {/* Schedule Config */}
          <div className="rounded-3xl bg-white border border-[#E8E5D5] p-6">
            <div className="flex items-center gap-2.5 mb-4">
              <Sliders className="h-5 w-5 text-purple-800" />
              <h2 className="text-base font-bold text-[#2D3748]">
                Dynamic Schedule Timings
              </h2>
            </div>
            <div className="rounded-2xl bg-[#FCF9EA] border border-[#E8E5D5] p-4 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Working Hours:</span>
                <span className="font-semibold">{scheduleConfig?.startTime || "11:00"} - {scheduleConfig?.endTime || "17:00"}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Slot Duration:</span>
                <span className="font-semibold">{scheduleConfig?.slotDurationMin || 45} mins</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Lunch Break:</span>
                <span className="font-semibold">{scheduleConfig?.lunchStartTime || "13:00"} ({scheduleConfig?.lunchDurationMin || 30} mins)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Counsellor Profile Editor (Accessible to Core) */}
        <CounsellorProfileEditor initialData={counsellorData} />
      </main>
    </div>
  );
}
