import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, MapPin, ShieldCheck } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function StudentDashboardPage() {
  const session = await auth();

  const [counsellingRoom, upcomingSessions] = await Promise.all([
    prisma.room.findFirst({
      where: { name: { contains: "Sick Room" } },
    }),
    prisma.session.findMany({
      where: {
        student: { email: session?.user?.email || "student.sample@mec.ac.in" },
      },
      include: {
        counsellor: true,
        room: true,
      },
      orderBy: { scheduledAt: "asc" },
    }),
  ]);

  const roomStatusDisplay = {
    VACANT_OPEN: { label: "Vacant / Available", color: "bg-[#BADFDB] text-emerald-900 border-[#9fd3ce]", dot: "bg-emerald-600" },
    ACTIVE_BOOKED: { label: "In Session (Booked)", color: "bg-[#BADFDB]/60 text-teal-900 border-[#BADFDB]", dot: "bg-teal-600" },
    BREAK_TIME: { label: "Break Time", color: "bg-[#FFBDBD]/60 text-amber-900 border-[#FFBDBD]", dot: "bg-amber-600" },
    ENGAGED: { label: "Engaged / Walk-in", color: "bg-[#FFA4A4]/50 text-rose-900 border-[#FFA4A4]", dot: "bg-rose-600" },
  };

  const currentStatusKey = (counsellingRoom?.currentStatus as keyof typeof roomStatusDisplay) || "VACANT_OPEN";
  const currentStatusInfo = roomStatusDisplay[currentStatusKey] || roomStatusDisplay.VACANT_OPEN;

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
            <span className="rounded-full bg-[#BADFDB] px-3 py-1 font-semibold text-teal-950">
              Student Portal
            </span>
            <span className="text-slate-600">{session?.user?.name || "Student"}</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 space-y-6">
        {/* Welcome & Confidentiality notice */}
        <div className="rounded-3xl bg-white border border-[#E8E5D5] p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-[#BADFDB]/40 px-3 py-0.5 text-xs font-semibold text-teal-950 mb-2">
                <ShieldCheck className="h-3.5 w-3.5" />
                100% Confidential Area
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#2D3748]">
                Welcome, {session?.user?.name || "Student"}
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-slate-600">
                Book 1:1 sessions with Babu Mathews, check live cabin wait times, and manage your private appointments.
              </p>
            </div>

            {/* Cabin Status Pill */}
            <div className="rounded-2xl bg-[#FCF9EA] border border-[#E8E5D5] p-4 flex flex-col items-start gap-1 sm:min-w-[200px]">
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Sick Room Cabin
              </div>
              <div className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${currentStatusInfo.dot}`} />
                <span className="text-xs font-bold text-[#2D3748]">
                  {currentStatusInfo.label}
                </span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-1">
                <MapPin className="h-3 w-3" />
                <span>Ground Floor, Near Library</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sessions Section */}
        <div className="rounded-3xl bg-white border border-[#E8E5D5] p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-[#2D3748]">
                Your Private Appointments
              </h2>
              <p className="text-xs text-slate-500">
                Details are visible only to you and counsellor Babu Mathews
              </p>
            </div>
            <button
              onClick={() => {}}
              className="rounded-xl bg-[#BADFDB] px-4 py-2 text-xs font-bold text-teal-950 hover:bg-[#a9d7d2] transition-colors"
            >
              Request 1:1 Session
            </button>
          </div>

          {upcomingSessions.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#E8E5D5] p-8 text-center">
              <Calendar className="mx-auto h-8 w-8 text-slate-400 mb-2" />
              <p className="text-sm font-semibold text-slate-700">No active sessions scheduled</p>
              <p className="text-xs text-slate-500 mt-1">
                You can book a session anytime or talk with Pebble the mascot in the bottom right corner for fast scheduling.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-[#F2EFE0]">
              {upcomingSessions.map((sess) => (
                <div key={sess.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#2D3748]">
                        1:1 Counselling Session
                      </span>
                      <span className="rounded-md bg-[#BADFDB]/50 px-2 py-0.5 text-[10px] font-bold text-teal-950">
                        {sess.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-slate-500 mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(sess.scheduledAt).toLocaleDateString("en-IN", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {new Date(sess.scheduledAt).toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      <span>Counsellor: {sess.counsellor?.name || "Babu Mathews"}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="rounded-lg border border-[#E8E5D5] bg-[#FCF9EA] px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-[#BADFDB]/30"
                    >
                      Reschedule
                    </button>
                    <button
                      className="rounded-lg border border-[#FFA4A4]/40 bg-[#FFA4A4]/20 px-3 py-1.5 text-xs font-semibold text-rose-900 hover:bg-[#FFA4A4]/40"
                    >
                      Cancel RSVP
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
