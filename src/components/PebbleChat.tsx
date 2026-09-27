"use client";

import { useState } from "react";
import { X, Send, Calendar, Clock, RotateCcw, AlertTriangle, ShieldAlert } from "lucide-react";

export default function PebbleChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    {
      sender: "pebble",
      text: "Hi there! I'm Pebble, your operations & scheduling companion at MEC Fortitude.\n\nI can help you check cabin wait times, manage bookings & RSVPs, or connect you with counsellor Babu Mathews. How can I support you today?",
    },
  ]);

  const handleSend = async (textToSend?: string) => {
    const userMsg = textToSend || message;
    if (!userMsg.trim()) return;

    setChatHistory((prev) => [...prev, { sender: "user", text: userMsg }]);
    if (!textToSend) setMessage("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg, userId: "student123" }),
      });
      const data = await res.json();

      setChatHistory((prev) => [
        ...prev,
        {
          sender: "pebble",
          text: data.reply,
          isEmergency: data.isEmergency,
          action: data.action,
        },
      ]);
    } catch {
      setChatHistory((prev) => [
        ...prev,
        {
          sender: "pebble",
          text: "I'm having a little trouble connecting right now. Please check back in a moment or visit the Sick Room cabin directly.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Pebble Mascot Floating Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Chat with Pebble Mascot"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center transition-transform hover:scale-105 active:scale-95 focus:outline-none"
      >
        <div className="relative flex items-center justify-center">
          {/* Pebble Avatar Graphic (Smooth egg-shaped pastel character with stubby arms, smile, blush) */}
          <svg
            width="68"
            height="72"
            viewBox="0 0 68 72"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-sm filter"
          >
            {/* Left Stubby Arm */}
            <path
              d="M10 38C7 38 5 43 7 47C9 50 14 49 14 44C14 40 12 38 10 38Z"
              fill="#BADFDB"
              stroke="#A2D2CD"
              strokeWidth="1.5"
            />
            {/* Right Stubby Arm */}
            <path
              d="M58 38C61 38 63 43 61 47C59 50 54 49 54 44C54 40 56 38 58 38Z"
              fill="#BADFDB"
              stroke="#A2D2CD"
              strokeWidth="1.5"
            />
            {/* Egg-Shaped Soft Body */}
            <path
              d="M34 6C18 6 10 24 10 44C10 59 19 68 34 68C49 68 58 59 58 44C58 24 50 6 34 6Z"
              fill="#FFFFFF"
              stroke="#BADFDB"
              strokeWidth="2.5"
            />
            {/* Soft Pastel Underbelly Glow */}
            <path
              d="M34 14C22 14 15 28 15 45C15 57 22 64 34 64C46 64 53 57 53 45C53 28 46 14 34 14Z"
              fill="#F4FBFA"
            />
            {/* Left Eye */}
            <ellipse cx="26" cy="33" rx="2.5" ry="3.5" fill="#2D3748" />
            <circle cx="27" cy="31.5" r="1" fill="#FFFFFF" />
            {/* Right Eye */}
            <ellipse cx="42" cy="33" rx="2.5" ry="3.5" fill="#2D3748" />
            <circle cx="43" cy="31.5" r="1" fill="#FFFFFF" />
            {/* Soft Pink Blush Cheeks */}
            <ellipse cx="21" cy="38" rx="3.5" ry="2" fill="#FFBDBD" opacity="0.85" />
            <ellipse cx="47" cy="38" rx="3.5" ry="2" fill="#FFBDBD" opacity="0.85" />
            {/* Sweet Gentle Smile */}
            <path
              d="M31 38.5C32.5 41 35.5 41 37 38.5"
              stroke="#2D3748"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            {/* Top Calm Leaf/Accent */}
            <path
              d="M34 2C32 4 33 6.5 34 7C35 6.5 36 4 34 2Z"
              fill="#BADFDB"
            />
          </svg>

          {/* Status Indicator Dot */}
          <span className="absolute top-1 right-2 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white"></span>
          </span>
        </div>
      </button>

      {/* Flat Pastel Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-96 h-[520px] bg-white border border-[#E8E5D5] rounded-3xl flex flex-col z-50 shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-[#FCF9EA] px-4 py-3.5 border-b border-[#E8E5D5] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              {/* Mini Pebble Icon */}
              <div className="w-8 h-8 rounded-full bg-white border border-[#BADFDB] flex items-center justify-center shadow-2xs">
                <svg width="20" height="20" viewBox="0 0 68 72" fill="none">
                  <path
                    d="M34 6C18 6 10 24 10 44C10 59 19 68 34 68C49 68 58 59 58 44C58 24 50 6 34 6Z"
                    fill="#FFFFFF"
                    stroke="#BADFDB"
                    strokeWidth="3"
                  />
                  <ellipse cx="26" cy="33" rx="3" ry="4" fill="#2D3748" />
                  <ellipse cx="42" cy="33" rx="3" ry="4" fill="#2D3748" />
                  <ellipse cx="20" cy="39" rx="4" ry="2.5" fill="#FFBDBD" />
                  <ellipse cx="48" cy="39" rx="4" ry="2.5" fill="#FFBDBD" />
                  <path d="M30 40C32 42.5 36 42.5 38 40" stroke="#2D3748" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm text-[#2D3748]">Pebble</span>
                  <span className="text-[10px] font-semibold bg-[#BADFDB] text-teal-900 px-1.5 py-0.2 rounded-md">
                    Mascot
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">Operations & Scheduling Guide</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1.5 text-slate-400 hover:text-slate-700 hover:bg-[#E8E5D5]/50 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Safety Disclaimer Banner */}
          <div className="bg-[#BADFDB]/20 border-b border-[#BADFDB]/40 px-3.5 py-2 flex items-start gap-2 text-[11px] text-teal-900 leading-tight">
            <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-teal-700 mt-0.5" />
            <span>In case of immediate attention please contact staff incharge/core member of fortitude to book an urgent slot or seek professional help.</span>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FAF9F5]/40 text-xs">
            {chatHistory.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-[#BADFDB] text-teal-950 font-medium rounded-br-2xs shadow-2xs"
                      : (msg as any).isEmergency
                      ? "bg-[#FFA4A4]/30 border border-[#FFA4A4] text-rose-950 rounded-bl-2xs"
                      : "bg-white border border-[#E8E5D5] text-[#2D3748] rounded-bl-2xs shadow-2xs"
                  }`}
                >
                  {(msg as any).isEmergency && (
                    <div className="flex items-center gap-1.5 font-bold text-rose-800 mb-1.5 text-[11px]">
                      <ShieldAlert className="h-3.5 w-3.5" />
                      <span>Immediate Support & Professional Guidance</span>
                    </div>
                  )}
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-[#E8E5D5] rounded-2xl rounded-bl-2xs px-3.5 py-2 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce"></span>
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
          </div>

          {/* Action Chips */}
          <div className="px-3 py-2 bg-white border-t border-[#E8E5D5] flex gap-1.5 overflow-x-auto no-scrollbar">
            <button
              onClick={() => handleSend("What is the current cabin wait time?")}
              className="inline-flex items-center gap-1 text-[11px] font-medium bg-[#FCF9EA] border border-[#E8E5D5] rounded-full px-2.5 py-1 text-slate-700 hover:bg-[#BADFDB]/40 hover:border-[#BADFDB] transition-colors shrink-0"
            >
              <Clock className="h-3 w-3 text-teal-800" />
              <span>Wait Time</span>
            </button>
            <button
              onClick={() => handleSend("How can I book a session with Babu Mathews?")}
              className="inline-flex items-center gap-1 text-[11px] font-medium bg-[#FCF9EA] border border-[#E8E5D5] rounded-full px-2.5 py-1 text-slate-700 hover:bg-[#BADFDB]/40 hover:border-[#BADFDB] transition-colors shrink-0"
            >
              <Calendar className="h-3 w-3 text-teal-800" />
              <span>Book Slot</span>
            </button>
            <button
              onClick={() => handleSend("I want to reschedule or cancel my RSVP")}
              className="inline-flex items-center gap-1 text-[11px] font-medium bg-[#FCF9EA] border border-[#E8E5D5] rounded-full px-2.5 py-1 text-slate-700 hover:bg-[#BADFDB]/40 hover:border-[#BADFDB] transition-colors shrink-0"
            >
              <RotateCcw className="h-3 w-3 text-teal-800" />
              <span>Manage RSVP</span>
            </button>
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-[#FCF9EA]/50 border-t border-[#E8E5D5] flex items-center gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask Pebble about scheduling..."
              className="flex-1 bg-white border border-[#E8E5D5] rounded-xl px-3.5 py-2 text-xs text-[#2D3748] placeholder-slate-400 focus:outline-none focus:border-[#BADFDB] focus:ring-1 focus:ring-[#BADFDB]"
            />
            <button
              onClick={() => handleSend()}
              disabled={!message.trim()}
              className="h-8 w-8 rounded-xl bg-[#BADFDB] text-teal-950 flex items-center justify-center hover:bg-[#9fd3ce] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

