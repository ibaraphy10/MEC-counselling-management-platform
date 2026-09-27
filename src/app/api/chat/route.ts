import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `
You are Pebble, the official operations and scheduling assistant mascot for the Model Engineering College (MEC) Fortitude Counselling system. 
You are a smooth, egg-shaped soft pastel character with tiny stubby arms and a gentle, comforting smile.

CRITICAL GUARDRAILS:
1. You are strictly an OPERATIONS AND SCHEDULING ASSISTANT, NOT a therapy bot, NOT a counsellor, and NOT a medical professional.
2. If a student exhibits signs of emotional distress, trauma-dumping, depression, or asks for clinical advice, you MUST:
   a. Gently and kindly clarify your role.
   b. AVOID giving any clinical advice or engaging in a deep emotional conversation.
   c. Immediately provide an option to book a confidential professional session with MEC counsellor Babu Mathews or provide emergency mental health helpline numbers (e.g., DISHA 1056, Tele-MANAS 14416 / 1800-891-4416, Kiran 1800-599-0019).
3. Your primary functions are:
   - Showing students their private session history.
   - Showing live Sick Room cabin status and estimated wait times.
   - Helping students handle RSVPs and last-minute cancellations.
`;

const DISTRESS_KEYWORDS = ["depressed", "suicide", "kill myself", "trauma", "can't take it", "anxiety", "panic", "hopeless", "cutting", "overwhelmed", "crying", "hurt myself", "hopelessness"];

export async function POST(req: Request) {
  try {
    const { message, userId } = await req.json();
    const lowerMessage = (message || "").toLowerCase();

    // 1. Guardrail Check (Mocked for Distress)
    const isDistressed = DISTRESS_KEYWORDS.some(keyword => lowerMessage.includes(keyword));
    if (isDistressed) {
      return NextResponse.json({
        reply: "I am so sorry you are going through a difficult time right now. Please know that you are not alone, but because I am Pebble (an automated scheduling assistant), I cannot provide the clinical care or emotional therapy you need.\n\nIn case of immediate attention please contact staff incharge/core member of fortitude to book an urgent slot or seek professional help.",
        isEmergency: true
      });
    }

    // 2. Action intents (Mocked routing)
    if (lowerMessage.includes("cancel") || lowerMessage.includes("rsvp") || lowerMessage.includes("reschedule")) {
      return NextResponse.json({
        reply: "I can help with your RSVPs and session rescheduling. You can use the Quick Action buttons or head to your private Student Portal to adjust your booking with 1-click.",
        action: "SHOW_RSVP"
      });
    }

    if (lowerMessage.includes("room status") || lowerMessage.includes("wait time") || lowerMessage.includes("cabin")) {
      return NextResponse.json({
        reply: "The Sick Room counselling cabin is currently VACANT / OPEN with Counsellor Babu Mathews. If you visit or book now, there is zero wait time.",
        action: "SHOW_STATUS"
      });
    }

    if (lowerMessage.includes("history") || lowerMessage.includes("profile") || lowerMessage.includes("book")) {
      return NextResponse.json({
        reply: "You can book 1:1 confidential slots or view your past appointments directly inside your private Student Portal. Your issues & reasons are kept 100% confidential.",
        action: "SHOW_PROFILE"
      });
    }

    // Default response
    return NextResponse.json({
      reply: `Hi there! I'm Pebble. I can help you check live Sick Room cabin status, manage your RSVPs, or check slot availability with counsellor Babu Mathews. How can I help you right now?`,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to process chat' }, { status: 500 });
  }
}
