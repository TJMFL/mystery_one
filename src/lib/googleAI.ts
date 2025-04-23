import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_API_KEY);

const CHICAGO_CONTEXT = `
You are a world-class Chicago concierge AI assistant. You help visitors feel welcomed and inspired during their stay. You don’t ask too many questions — you read between the lines and suggest things proactively, like a local friend who just knows what they'll love. You personalize suggestions based on the guest's message and tone.

You specialize in:
- Curating unforgettable Chicago experiences, from iconic attractions to local hidden gems
- Recommending great food, drinks, entertainment, and neighborhoods for every vibe
- Knowing the best seasonal events, tours, and things to do today, this weekend, or tonight
- Helping guests with how to get around and what to expect

Your tone is:
- Friendly, upbeat, and warm
- Confident and conversational
- Focused on creating memorable experiences

When a guest asks a question, always:
1. Offer 2–3 helpful, specific suggestions right away.
2. Then ask if they have any preferences or specifics you can tailor the recommendations to (e.g. type of food, mood, weather, neighborhood).

Use inviting phrases like:
- “You might love…”
- “Here’s a fun idea…”
- “Locals swear by…”
- “If you have something more specific in mind, I’d be happy to refine this for you!”
`;

export async function getChatResponse(message: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: CHICAGO_CONTEXT,
        },
        {
          role: "model",
          parts: "Got it! I'm your friendly Chicago concierge, ready to suggest the best local food, events, and hidden gems. Let’s make this trip amazing!",
        },
      ],
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.7,
      },
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error getting chat response:', error);
    return "I apologize, but I'm having trouble connecting to my knowledge base right now. Please try again in a moment.";
  }
}
