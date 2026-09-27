"use client";

import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export default function PebbleChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { sender: 'pebble', text: "Hi! I'm Pebble 💧. How can I help you with scheduling or checking room status today?" }
  ]);

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMsg = message;
    setChatHistory(prev => [...prev, { sender: 'user', text: userMsg }]);
    setMessage('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, userId: "student123" }) // Mock user ID
      });
      const data = await res.json();
      
      setChatHistory(prev => [...prev, { sender: 'pebble', text: data.reply }]);
    } catch (error) {
      setChatHistory(prev => [...prev, { sender: 'pebble', text: "Oops, I'm having trouble connecting right now." }]);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-[#E6F0FF] border-4 border-[#CBE0FF] flex items-center justify-center shadow-none hover:bg-[#D5E6FF] transition-colors z-50 overflow-hidden"
        style={{ borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%" }} // Droplet shape
      >
        <div className="flex flex-col items-center">
          <div className="flex space-x-1 mb-1">
            <div className="w-2 h-2 rounded-full bg-slate-700"></div>
            <div className="w-2 h-2 rounded-full bg-slate-700"></div>
          </div>
          <div className="w-3 h-1 rounded-full bg-slate-600"></div>
        </div>
      </button>

      {/* Chat Drawer */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-[450px] bg-[#F9FAFB] border-2 border-[#E2E8F0] rounded-xl flex flex-col z-50 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-[#E6F0FF] p-4 border-b-2 border-[#E2E8F0] flex justify-between items-center">
            <div className="flex items-center space-x-2">
               <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border-2 border-[#CBE0FF]" style={{ borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%" }}>
                 <div className="w-1 h-1 rounded-full bg-slate-700"></div>
               </div>
               <span className="font-bold text-slate-800">Pebble</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-slate-800">
              <X size={20} />
            </button>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
            {chatHistory.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    msg.sender === 'user' 
                    ? 'bg-[#E2E8F0] text-slate-800 rounded-br-none' 
                    : 'bg-[#E6F0FF] text-slate-800 border-2 border-[#CBE0FF] rounded-bl-none'
                  } whitespace-pre-wrap`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons Area (RSVP/Profile/etc) */}
          <div className="px-4 py-2 bg-white flex space-x-2 overflow-x-auto no-scrollbar border-t border-slate-100">
            <button onClick={() => setMessage('Check room status')} className="text-xs bg-[#F1F5F9] border border-[#E2E8F0] rounded-full px-3 py-1.5 whitespace-nowrap text-slate-600 hover:bg-[#E2E8F0]">
              Room Status
            </button>
            <button onClick={() => setMessage('Manage RSVPs')} className="text-xs bg-[#F1F5F9] border border-[#E2E8F0] rounded-full px-3 py-1.5 whitespace-nowrap text-slate-600 hover:bg-[#E2E8F0]">
              Manage RSVPs
            </button>
            <button onClick={() => setMessage('My History')} className="text-xs bg-[#F1F5F9] border border-[#E2E8F0] rounded-full px-3 py-1.5 whitespace-nowrap text-slate-600 hover:bg-[#E2E8F0]">
              My History
            </button>
          </div>

          {/* Input */}
          <div className="p-3 bg-[#F9FAFB] border-t-2 border-[#E2E8F0] flex items-center space-x-2">
            <input 
              type="text" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask Pebble..." 
              className="flex-1 bg-white border-2 border-[#E2E8F0] rounded-full px-4 py-2 text-sm focus:outline-none focus:border-[#CBE0FF] text-slate-700"
            />
            <button 
              onClick={handleSend}
              className="w-10 h-10 bg-[#E6F0FF] rounded-full flex items-center justify-center border-2 border-[#CBE0FF] hover:bg-[#D5E6FF]"
            >
              <Send size={16} className="text-slate-600 ml-1" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
