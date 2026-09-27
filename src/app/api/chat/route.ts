import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `
You are Pebble, the official operations and scheduling assistant mascot for the Model Engineering College (MEC) Fortitude Counseling system. 
You are a cute white droplet with a soft blue tint.

CRITICAL GUARDRAILS:
1. You are an OPERATIONS AND SCHEDULING ASSISTANT, NOT a therapy bot, NOT a counselor, and NOT a medical professional.
2. If a student exhibits signs of emotional distress, trauma-dumping, depression, or asks for clinical advice, you MUST:
   a. Gently and kindly clarify your role.
   b. AVOID giving any clinical advice or engaging in a deep emotional conversation.
   c. Immediately provide an option to book a professional session with the MEC counselor or provide emergency mental health helpline numbers (e.g., DISHA 1056, Kiran 1800-599-0019).
3. Your primary functions are:
   - Showing students their profile and session history.
   - Showing live counseling room status and estimated wait times.
   - Helping students handle RSVPs and last-minute cancellations.
`;

const DISTRESS_KEYWORDS = ["depressed", "suicide", "kill myself", "trauma", "can't take it", "anxiety", "panic", "hopeless", "cutting"];

export async function POST(req: Request) {
  try {
    const { message, userId } = await req.json();
    const lowerMessage = message.toLowerCase();

    // 1. Guardrail Check (Mocked for Distress)
    const isDistressed = DISTRESS_KEYWORDS.some(keyword => lowerMessage.includes(keyword));
    if (isDistressed) {
      return NextResponse.json({
        reply: "I am so sorry you are feeling this way. However, I am just Pebble, an operations and scheduling assistant, and I cannot provide the therapy or counseling you deserve right now.\n\nPlease reach out to a professional immediately. You can book an urgent session with our MEC counselor right here, or call the emergency helpline (DISHA: 1056, Kiran: 1800-599-0019). We care about you.",
        isEmergency: true
      });
    }

    // 2. Action intents (Mocked routing)
    if (lowerMessage.includes("cancel") || lowerMessage.includes("rsvp")) {
      return NextResponse.json({
        reply: "I can help with your RSVPs and cancellations! Just click the 'Manage RSVPs' button below or let me know which session you want to update.",
        action: "SHOW_RSVP"
      });
    }

    if (lowerMessage.includes("room status") || lowerMessage.includes("wait time")) {
      return NextResponse.json({
        reply: "Let me check the room status for you... The counseling room is currently VACANT_OPEN. If you book now, there is almost no wait time!",
        action: "SHOW_STATUS"
      });
    }

    if (lowerMessage.includes("history") || lowerMessage.includes("profile")) {
      return NextResponse.json({
        reply: "Here is your profile and session history. You've had 1 session so far this semester.",
        action: "SHOW_PROFILE"
      });
    }

    // Default response (Placeholder for real LLM integration)
    return NextResponse.json({
      reply: `Hi! I'm Pebble 💧. I can help you check room status, manage your RSVPs, or look up your session history. How can I assist you today?`,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to process chat' }, { status: 500 });
  }
}
