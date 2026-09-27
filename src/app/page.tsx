import Link from "next/link";
import prisma from "@/lib/prisma";
import {
  ShieldCheck,
  HeartHandshake,
  UserCheck,
  CalendarCheck,
  Clock,
  MapPin,
  Mail,
  ArrowRight,
  Phone,
  Link2,
  User,
  Code2,
  ExternalLink,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function Home() {
  // Fetch room status & counsellor details
  const [counsellingRoom, counsellor] = await Promise.all([
    prisma.room.findFirst({
      where: { name: { contains: "Sick Room" } },
    }),
    prisma.user.findFirst({
      where: { role: "COUNSELLOR" },
    }),
  ]);

  const counsellorInfo = counsellor || {
    name: "Babu Mathews",
    designation: "Campus Counsellor & Psychological Guidance Consultant",
    department: "Student Well-Being & Guidance",
    phone: "+91 98765 43210",
    email: "counsellor@mec.ac.in",
    linkedin: "https://linkedin.com/in/babu-mathews",
  };

  const roomStatusDisplay = {
    VACANT_OPEN: { label: "Vacant / Available", color: "bg-[#BADFDB] text-emerald-900 border-[#9fd3ce]", dot: "bg-emerald-600" },
    ACTIVE_BOOKED: { label: "In Session (Booked)", color: "bg-[#BADFDB]/60 text-teal-900 border-[#BADFDB]", dot: "bg-teal-600" },
    BREAK_TIME: { label: "Break Time", color: "bg-[#FFBDBD]/60 text-amber-900 border-[#FFBDBD]", dot: "bg-amber-600" },
    ENGAGED: { label: "Engaged / Walk-in", color: "bg-[#FFA4A4]/50 text-rose-900 border-[#FFA4A4]", dot: "bg-rose-600" },
  };

  const currentStatusKey = (counsellingRoom?.currentStatus as keyof typeof roomStatusDisplay) || "VACANT_OPEN";
  const currentStatusInfo = roomStatusDisplay[currentStatusKey] || roomStatusDisplay.VACANT_OPEN;

  // Contact Persons Data for Fortitude
  const contacts = [
    {
      role: "Staff-in-Charge",
      name: "P M Laghima",
      department: "Assistant Professor, Dept. of Electronics Engineering",
      phone: "",
      email: "",
    },
    {
      role: "Chairperson",
      name: "Sreenidhi Ajit",
      department: "Computer Science & Engineering",
      classYear: "3rd Year",
      phone: "",
      email: "",
    },
    {
      role: "Vice-Chairperson",
      name: "Hrishidev S",
      department: "Computer Science & Engineering",
      classYear: "3rd Year",
      phone: "",
      email: "",
    },
    {
      role: "Counselling Head",
      name: "Francisa Thankachan",
      department: "Electrical & Electronics Engineering",
      classYear: "3rd Year",
      phone: "",
      email: "",
    },
  ];

  // Contributors Data
  const contributors = [
    {
      name: "Iba Raphy",
      role: "Lead Developer & System Architect",
      department: "Model Engineering College",
      email: "ibaraphy.mec@gmail.com",
      linkedin: "www.linkedin.com/in/iba-raphy-a3424a296",
      github: "https://github.com/ibaraphy10",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FCF9EA] text-[#2D3748]">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-[#E8E5D5] bg-[#FCF9EA]/90 backdrop-blur-xs">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo & Plain Text (No background boxes or subtitles) */}
          <Link href="/" className="flex items-center gap-2.5">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#2D3748"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-[#2D3748]"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M12 8v4" />
              <path d="M12 16h.01" />
            </svg>
            <span className="text-xl font-bold tracking-tight text-[#2D3748]">
              Fortitude MEC
            </span>
          </Link>

          {/* Top-right Navigation: About, Contributors, Contact */}
          <nav className="flex items-center gap-5 sm:gap-6 text-xs sm:text-sm font-medium text-slate-700">
            <a href="#about" className="hover:text-teal-950 transition-colors">
              About
            </a>
            <a href="#contributors" className="hover:text-teal-950 transition-colors">
              Contributors
            </a>
            <a href="#contact" className="hover:text-teal-950 transition-colors">
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-12 pb-10 sm:pt-16 sm:pb-12">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#2D3748] leading-tight sm:leading-tight">
              Empathetic care, strict confidentiality, seamless guidance.
            </h1>

            {/* Clean landing copy */}
            <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
              Platform for MEC&apos;s counselling management system. Book private 1:1 sessions, stay informed on cabin availability, and prioritize mental well-being in a secure, stigma-free environment.
            </p>

            {/* Live Room Status Flat Pill */}
            <div className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-white border border-[#E8E5D5] p-3 sm:px-5 shadow-xs">
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${currentStatusInfo.dot}`} />
                  <span className={`relative inline-flex rounded-full h-3 w-3 ${currentStatusInfo.dot}`} />
                </span>
                <span className="text-xs font-medium text-slate-500">Cabin Status:</span>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${currentStatusInfo.color}`}>
                  {currentStatusInfo.label}
                </span>
              </div>
              <span className="hidden sm:inline-block text-slate-300">|</span>
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-600">
                <MapPin className="h-3.5 w-3.5 text-slate-400" />
                <span>{counsellingRoom?.location || "Main Block, Ground Floor, near Library"}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Login as: Section */}
        <section className="py-6 sm:py-10">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold tracking-tight text-[#2D3748]">
                Login as:
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {/* Student Card */}
              <div className="flex flex-col justify-between rounded-3xl bg-white border border-[#E8E5D5] border-l-4 border-l-[#BADFDB] p-6 sm:p-7 shadow-xs transition hover:shadow-sm">
                <div>
                  <h3 className="text-xl font-bold text-[#2D3748] mb-3">
                    Student
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    Book 1:1 confidential counselling slots, check live cabin wait times, or request reschedule with zero upfront topic disclosure.
                  </p>
                </div>
                <Link
                  href="/login?role=student"
                  className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-[#BADFDB] py-3 px-4 text-xs font-bold text-teal-950 hover:bg-[#a9d7d2] transition-colors shadow-2xs"
                >
                  <span>Student Login</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* Counsellor Card */}
              <div className="flex flex-col justify-between rounded-3xl bg-white border border-[#E8E5D5] border-l-4 border-l-[#FFA4A4] p-6 sm:p-7 shadow-xs transition hover:shadow-sm">
                <div>
                  <h3 className="text-xl font-bold text-[#2D3748] mb-3">
                    Counsellor
                  </h3>
                </div>
                <Link
                  href="/login?role=counsellor"
                  className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-[#FFA4A4]/40 py-3 px-4 text-xs font-bold text-rose-950 hover:bg-[#FFA4A4]/60 transition-colors shadow-2xs mt-12"
                >
                  <span>Counsellor Login</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* Core Committee Card */}
              <div className="flex flex-col justify-between rounded-3xl bg-white border border-[#E8E5D5] border-l-4 border-l-[#FFBDBD] p-6 sm:p-7 shadow-xs transition hover:shadow-sm">
                <div>
                  <h3 className="text-xl font-bold text-[#2D3748] mb-3">
                    Core Committee
                  </h3>
                </div>
                <Link
                  href="/login?role=core"
                  className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-[#FFBDBD]/60 py-3 px-4 text-xs font-bold text-slate-900 hover:bg-[#FFBDBD] transition-colors shadow-2xs mt-12"
                >
                  <span>Core Committee Login</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Privacy & Confidentiality Guarantee Banner (Without encrypted tag) */}
        <section className="py-6">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-white border border-[#E8E5D5] p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#BADFDB]/40 text-teal-950">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-[#2D3748]">
                    Strict Confidentiality & Privacy Guarantee
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Under MEC Fortitude guidelines, session topics and personal reasons are never requested upfront during booking.
                    All private notes and interaction records are strictly restricted between you and counsellor <strong>Babu Mathews</strong>.
                    Public dashboards will never expose student identities, roll numbers, or personal discussions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-14 border-t border-[#E8E5D5] scroll-mt-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FFBDBD]/40 text-rose-950 mb-3">
                <HeartHandshake className="h-5 w-5" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#2D3748]">
                About Fortitude MEC
              </h2>
              {/* Exact Requested About Text */}
              <p className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed text-center font-normal">
                Fortitude is the mental health and wellness club of Govt. Model Engineering College, Thrikkakara and under the initiatives of Parent Teacher body Association (PTA), weekly counselling sessions are arranged for students and faculty, designed to support mental well-being, academic resilience, and personal guidance. We believe in providing a safe, accessible, and compassionate platform where students and staff of MEC can seek help without hesitation.
              </p>
            </div>

            {/* Meet Our Counsellor Section (Inside About) */}
            <div className="rounded-3xl bg-white border border-[#E8E5D5] p-6 sm:p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                {/* Counsellor Avatar Placeholder */}
                <div className="h-24 w-24 sm:h-28 sm:w-28 shrink-0 rounded-3xl bg-[#BADFDB]/30 border-2 border-[#BADFDB] flex flex-col items-center justify-center text-teal-950 shadow-xs">
                  <User className="h-12 w-12 text-teal-800" />
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-teal-800">
                        Meet Our Counsellor
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-[#2D3748]">
                        {counsellorInfo.name}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">
                        {counsellorInfo.designation || "Campus Counsellor & Psychological Guidance Consultant"}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      {counsellorInfo.linkedin && (
                        <a
                          href={counsellorInfo.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-xl bg-[#FCF9EA] border border-[#E8E5D5] px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-[#BADFDB]/30 transition-colors"
                        >
                          <Link2 className="h-3.5 w-3.5 text-teal-800" />
                          <span>LinkedIn</span>
                        </a>
                      )}
                      <a
                        href={`mailto:${counsellorInfo.email}`}
                        className="inline-flex items-center gap-1 rounded-xl bg-[#BADFDB] px-3 py-1.5 text-xs font-bold text-teal-950 hover:bg-[#a9d7d2] transition-colors"
                      >
                        <Mail className="h-3.5 w-3.5" />
                        <span>Email</span>
                      </a>
                    </div>
                  </div>

                  <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Available for 1:1 in-person confidential counselling at the college <strong>Sick Room cabin (Ground Floor, near Library)</strong>. Specializing in academic stress management, personal growth, emotional well-being, and career resilience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contributors Section */}
        <section id="contributors" className="py-14 border-t border-[#E8E5D5] scroll-mt-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#BADFDB]/40 text-teal-950 mb-3">
                <Code2 className="h-5 w-5" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#2D3748]">
                Contributors
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-500">
                Engineered with care for the Model Engineering College community
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {contributors.map((c, i) => (
                <div
                  key={i}
                  className="rounded-3xl bg-white border border-[#E8E5D5] p-6 text-center shadow-xs flex flex-col items-center justify-between"
                >
                  <div className="flex flex-col items-center">
                    {/* Profile Icon Placeholder */}
                    <div className="h-16 w-16 rounded-full bg-[#FCF9EA] border-2 border-[#BADFDB] flex items-center justify-center text-teal-950 mb-3 shadow-2xs">
                      <User className="h-8 w-8 text-teal-800" />
                    </div>
                    <h3 className="text-base font-bold text-[#2D3748]">
                      {c.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      {c.role}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {c.department}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 mt-5">
                    <a
                      href={`mailto:${c.email}`}
                      className="inline-flex items-center gap-1 rounded-xl bg-[#FCF9EA] border border-[#E8E5D5] px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-[#BADFDB]/30 transition-colors"
                      title={c.email}
                    >
                      <Mail className="h-3.5 w-3.5 text-teal-800" />
                      <span>Mail</span>
                    </a>
                    {c.linkedin && (
                      <a
                        href={c.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-xl bg-[#BADFDB] px-3 py-1.5 text-xs font-bold text-teal-950 hover:bg-[#a9d7d2] transition-colors"
                      >
                        <Link2 className="h-3.5 w-3.5" />
                        <span>LinkedIn</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-14 border-t border-[#E8E5D5] scroll-mt-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FFA4A4]/40 text-rose-950 mb-3">
                <Phone className="h-5 w-5" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#2D3748]">
                Contact & Core Office Bearers
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-500">
                Reach out to staff coordinators and student representatives for assistance or urgent requirements
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contacts.map((contact, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl bg-white border border-[#E8E5D5] p-5 sm:p-6 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-[#BADFDB]/40 text-teal-950 px-2.5 py-0.5 rounded-full">
                      {contact.role}
                    </span>
                    <h3 className="text-base font-bold text-[#2D3748] mt-2">
                      {contact.name}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {contact.department} {contact.classYear ? `• ${contact.classYear}` : ""}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#F2EFE0] flex flex-wrap items-center justify-between gap-2 text-xs">
                    <a
                      href={`tel:${contact.phone}`}
                      className="inline-flex items-center gap-1.5 font-semibold text-[#2D3748] hover:text-teal-950"
                    >
                      <Phone className="h-3.5 w-3.5 text-slate-400" />
                      <span>{contact.phone}</span>
                    </a>
                    <a
                      href={`mailto:${contact.email}`}
                      className="inline-flex items-center gap-1 text-slate-500 hover:text-teal-950"
                    >
                      <Mail className="h-3.5 w-3.5 text-slate-400" />
                      <span>{contact.email}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E8E5D5] bg-[#FCF9EA] py-8">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">Fortitude MEC</span>
              <span>• Govt. Model Engineering College, Thrikkakara</span>
            </div>
            <div>
              Suggestions or queries:{" "}
              <a
                href="mailto:ibaraphy.mec@gmail.com"
                className="font-semibold text-teal-800 hover:underline"
              >
                ibaraphy.mec@gmail.com
              </a>
            </div>
          </div>
          <p className="mt-4 text-[11px] text-slate-400">
            © {new Date().getFullYear()} Fortitude Counselling Platform. All student counselling communications remain strictly confidential.
          </p>
        </div>
      </footer>
    </div>
  );
}


