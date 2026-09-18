import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Home() {
  // Fetch live data from SQLite via Prisma ORM
  const [users, rooms, sessions, statusHistory] = await Promise.all([
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
    }),
    prisma.room.findMany({
      orderBy: { name: "asc" },
    }),
    prisma.session.findMany({
      include: {
        student: true,
        counsellor: true,
        room: true,
      },
      orderBy: { scheduledAt: "asc" },
    }),
    prisma.roomStatusHistory.findMany({
      include: {
        room: true,
        changedBy: true,
      },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const roles = [
    {
      name: "STUDENT",
      badge: "Student Portal",
      color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
      description:
        "Confidential counselling session booking, request tracking, personalized support for academic & personal well-being.",
      features: ["Confidential Requests", "Counsellor Selection", "Online / In-Person Mode", "Session History"],
    },
    {
      name: "COUNSELLOR",
      badge: "Counsellor Cabin",
      color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
      description:
        "Manage allocated student sessions, document private counselling notes, and update cabin availability.",
      features: ["Session Scheduling", "Confidential Case Notes", "Availability Sync", "Student History"],
    },
    {
      name: "CORE",
      badge: "Core Committee",
      color: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
      description:
        "Oversee room allocation, coordinate sessions, manage facility maintenance, and maintain audit logs.",
      features: ["Live Room Status", "Audit & History Logs", "Slot Coordination", "System Administration"],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Navigation */}
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white font-bold shadow-md shadow-indigo-500/20">
              F
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                Fortitude
              </span>
              <span className="ml-2 rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                MEC
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 font-medium text-emerald-600 dark:text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              SQLite DB Active ({users.length} Users • 1 Dedicated Room • {sessions.length} Bookings)
            </span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-24">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,rgba(99,102,241,0.1),transparent)]" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-50/50 px-3.5 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 mb-6">
                <span>Model Engineering College</span>
                <span>•</span>
                <span>Counselling Management System</span>
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl dark:text-white">
                Empathetic care, seamless scheduling.
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
                Fortitude powers student well-being at MEC through confidential counselling appointment booking,
                counsellor allocation, and real-time room status tracking.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <span className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                  ⚡ Next.js 16 App Router
                </span>
                <span className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                  🎨 Tailwind CSS v4
                </span>
                <span className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                  🛡️ TypeScript
                </span>
                <span className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                  🗄️ Prisma ORM
                </span>
                <span className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                  💾 SQLite Local DB
                </span>
              </div>
            </div>

            {/* Live Database Status Banner */}
            <div className="mt-14 rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 text-white shadow-xl dark:border-slate-800">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <h3 className="text-base font-bold text-white tracking-wide">
                      Live Prisma Database Sync: Connected
                    </h3>
                  </div>
                  <p className="mt-1 text-xs text-slate-300">
                    SQLite storage initialized at <code className="text-indigo-300">prisma/dev.db</code> with relational schemas.
                  </p>
                </div>
                <div className="grid grid-cols-4 gap-3 w-full sm:w-auto">
                  <div className="rounded-xl bg-white/10 px-3 py-2 text-center backdrop-blur-xs">
                    <div className="text-xl font-bold text-white">{users.length}</div>
                    <div className="text-[10px] uppercase font-semibold text-slate-300">Users</div>
                  </div>
                  <div className="rounded-xl bg-white/10 px-3 py-2 text-center backdrop-blur-xs">
                    <div className="text-xl font-bold text-white">{rooms.length}</div>
                    <div className="text-[10px] uppercase font-semibold text-slate-300">Rooms</div>
                  </div>
                  <div className="rounded-xl bg-white/10 px-3 py-2 text-center backdrop-blur-xs">
                    <div className="text-xl font-bold text-white">{sessions.length}</div>
                    <div className="text-[10px] uppercase font-semibold text-slate-300">Sessions</div>
                  </div>
                  <div className="rounded-xl bg-white/10 px-3 py-2 text-center backdrop-blur-xs">
                    <div className="text-xl font-bold text-white">{statusHistory.length}</div>
                    <div className="text-[10px] uppercase font-semibold text-slate-300">Audits</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Data Previews from Database */}
            <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Users Table */}
              <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      Registered Users ({users.length})
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      With roles, department, and class/year metadata
                    </p>
                  </div>
                  <span className="rounded-md bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                    User Model
                  </span>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {users.map((u) => (
                    <div key={u.id} className="py-3 flex items-center justify-between gap-4">
                      <div>
                        <div className="text-sm font-semibold text-slate-900 dark:text-white">
                          {u.name}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {u.email} • {u.department || "General"} {u.classYear ? `(${u.classYear})` : ""}
                        </div>
                      </div>
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${
                          u.role === "COUNSELLOR"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300"
                            : u.role === "CORE"
                            ? "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300"
                            : "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300"
                        }`}
                      >
                        {u.role}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rooms & Status Table */}
              <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      Dedicated Counselling Room
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Live status & occupancy tracking for the college counselling cabin
                    </p>
                  </div>
                  <span className="rounded-md bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                    Room Model
                  </span>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {rooms.map((room) => (
                    <div key={room.id} className="py-3 flex items-center justify-between gap-4">
                      <div>
                        <div className="text-sm font-semibold text-slate-900 dark:text-white">
                          {room.name} {room.code && <span className="text-xs text-slate-400">({room.code})</span>}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {room.location} • Capacity: {room.capacity}
                        </div>
                      </div>
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full border bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300">
                        {room.currentStatus}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sessions & Bookings Preview */}
            <div className="mt-8 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Active Counselling Sessions & Bookings ({sessions.length})
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Linked to students, counsellors, rooms, and confidentiality notes
                  </p>
                </div>
                <span className="rounded-md bg-violet-50 px-2 py-1 text-xs font-semibold text-violet-700 dark:bg-violet-950 dark:text-violet-300">
                  Session Model
                </span>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {sessions.map((sess) => (
                  <div key={sess.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold text-slate-900 dark:text-white">
                        {sess.sessionType || "General Counselling"}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Student: <strong className="text-slate-700 dark:text-slate-300">{sess.student.name}</strong> • 
                        Counsellor: <strong className="text-slate-700 dark:text-slate-300">{sess.counsellor?.name || "Pending Allocation"}</strong> • 
                        Cabin: {sess.room?.name || "Unassigned"}
                      </div>
                      {sess.reason && (
                        <div className="mt-1 text-xs italic text-slate-600 dark:text-slate-400">
                          &quot;{sess.reason}&quot;
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        {sess.mode}
                      </span>
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full border bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300">
                        {sess.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Role Architecture Cards */}
            <div className="mt-20">
              <div className="text-center mb-10">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                  User Roles & Access Control
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Built-in multi-role system designed specifically for campus counselling operations
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {roles.map((role) => (
                  <div
                    key={role.name}
                    className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className={`rounded-md border px-2.5 py-1 text-xs font-semibold ${role.color}`}>
                          {role.badge}
                        </span>
                        <code className="text-xs font-mono text-slate-400">role: {role.name}</code>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-300 mb-6">
                        {role.description}
                      </p>
                    </div>

                    <div className="border-t border-slate-100 pt-4 dark:border-slate-800">
                      <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                        Key Capabilities
                      </div>
                      <ul className="space-y-1.5">
                        {role.features.map((feat) => (
                          <li key={feat} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                            {feat}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} Fortitude Counselling Management • Model Engineering College (MEC)</p>
          <p className="mt-1">Built with Next.js App Router, Tailwind CSS, and Prisma ORM with SQLite.</p>
        </div>
      </footer>
    </div>
  );
}
