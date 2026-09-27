import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft, User, Phone, MapPin, AlertOctagon, Power, Clock } from "lucide-react";
import CounsellorProfileEditor from "@/components/CounsellorProfileEditor";

export const dynamic = "force-dynamic";

export default async function CounsellorDashboardPage() {
  const session = await auth();

  const [counsellor, counsellingRoom, todaySessions] = await Promise.all([
    prisma.user.findFirst({
      where: { role: "COUNSELLOR" },
    }),
    prisma.room.findFirst({
      where: { name: { contains: "Sick Room" } },
    }),
    prisma.session.findMany({
      include: {
        student: true,
      },
      orderBy: { scheduledAt: "asc" },
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
            <span className="rounded-full bg-[#FFA4A4]/40 px-3 py-1 font-semibold text-rose-950">
              Counsellor Cabin
            </span>
            <span className="text-slate-600">{counsellorData.name}</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 space-y-6">
        {/* Quick Operations Console */}
        <div className="rounded-3xl bg-white border border-[#E8E5D5] p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-800">
                Cabin Operational Controls
              </span>
              <h1 className="text-2xl font-bold text-[#2D3748] mt-0.5">
                {counsellorData.name}&apos;s Cabin Console
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Cabin: {counsellingRoom?.name || "Sick Room, near Library"} • Status: <strong>{counsellingRoom?.currentStatus || "VACANT_OPEN"}</strong>
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap gap-2">
              <button className="inline-flex items-center gap-1.5 rounded-xl bg-[#BADFDB] px-3.5 py-2 text-xs font-bold text-teal-950 hover:bg-[#a9d7d2] transition-colors">
                <Clock className="h-3.5 w-3.5" />
                +15m Walk-in Delay
              </button>
              <button className="inline-flex items-center gap-1.5 rounded-xl bg-[#FFA4A4]/40 px-3.5 py-2 text-xs font-bold text-rose-950 hover:bg-[#FFA4A4]/60 transition-colors">
                <AlertOctagon className="h-3.5 w-3.5" />
                SOS Alert Core
              </button>
              <button className="inline-flex items-center gap-1.5 rounded-xl bg-[#FFBDBD]/60 px-3.5 py-2 text-xs font-bold text-amber-950 hover:bg-[#FFBDBD] transition-colors">
                <Power className="h-3.5 w-3.5" />
                End Day Sessions
              </button>
            </div>
          </div>
        </div>

        {/* Confidential Sessions List */}
        <div className="rounded-3xl bg-white border border-[#E8E5D5] p-6 sm:p-8">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-[#2D3748]">
              Scheduled Sessions ({todaySessions.length})
            </h2>
            <p className="text-xs text-slate-500">
              Confidential student counselling session roster
            </p>
          </div>

          <div className="divide-y divide-[#F2EFE0]">
            {todaySessions.map((sess) => (
              <div key={sess.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-[#2D3748]">
                      {sess.student?.name}
                    </span>
                    <span className="text-xs text-slate-500">
                      ({sess.student?.department || "General"})
                    </span>
                    <span className="rounded-md bg-[#BADFDB]/50 px-2 py-0.5 text-[10px] font-bold text-teal-950">
                      {sess.status}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    Scheduled: {new Date(sess.scheduledAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="rounded-lg border border-[#E8E5D5] bg-[#FCF9EA] px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-[#BADFDB]/30">
                    Add Private Notes
                  </button>
                  <button className="rounded-lg bg-[#BADFDB] px-3 py-1 text-xs font-bold text-teal-950 hover:bg-[#a9d7d2]">
                    Mark Completed
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Counsellor Profile Editor */}
        <CounsellorProfileEditor initialData={counsellorData} />
      </main>
    </div>
  );
}
