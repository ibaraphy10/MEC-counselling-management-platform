import Link from "next/link";
import { ShieldAlert, ArrowLeft } from "lucide-react";
import { auth } from "@/auth";

export default async function UnauthorizedPage() {
  const session = await auth();

  let targetDashboard = "/login";
  if (session?.user?.role === "STUDENT") targetDashboard = "/dashboard/student";
  else if (session?.user?.role === "CORE") targetDashboard = "/dashboard/core";
  else if (session?.user?.role === "COUNSELLOR") targetDashboard = "/dashboard/counsellor";

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-950">
      <div className="w-full max-w-md rounded-2xl border border-rose-200/80 bg-white p-8 text-center shadow-lg dark:border-rose-900/40 dark:bg-slate-900">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 mb-5">
          <ShieldAlert className="h-7 w-7" />
        </div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">
          Access Restricted
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Your account role (<strong className="font-semibold text-slate-800 dark:text-slate-200">{session?.user?.role || "Guest"}</strong>) does not have permission to access this area.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <Link
            href={targetDashboard}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Return to Authorized Dashboard
          </Link>
          <Link
            href="/"
            className="text-xs text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
          >
            Go to Fortitude Home
          </Link>
        </div>
      </div>
    </div>
  );
}
