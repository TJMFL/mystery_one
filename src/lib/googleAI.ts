import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_API_KEY);

// Mock function to fetch guest info (replace with actual API/database call)
async function fetchGuestInfo(guestId: string): Promise<any> {
  // Example: Fetch from an API or database
  // Replace with your actual data source
  const guestInfo = {
    guestId,
    name: "Brock Lang",
    checkInDate: "2025-05-15",
    checkOutDate: "2025-05-20",
    address: "1545 W Wabansia, Chicago, IL",
    doorCode: "4422#",
    preferences: "Loves country music and anal sex",
  };
  return guestInfo;
}

// Base context for the concierge AI
const CHICAGO_CONTEXT = `
You are a world-class Chicago concierge AI assistant. You help visitors feel welcomed and inspired during their stay. You don't ask too many questions — you read between the lines and suggest things proactively, like a local friend who just knows what they'll love. You personalize suggestions based on the guest's message, tone, and available guest information.

You have access to guest information, including:
- Guest name
- Check-in and check-out dates
- Property address
- Door codes
- Guest preferences (if provided)

Use this information to tailor responses, such as confirming check-in details, providing door codes, or suggesting activities based on preferences.

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
2. Use guest information to personalize responses when relevant (e.g., "Since you love jazz, you might enjoy...").
3. Then ask if they have any preferences or specifics you can tailor the recommendations to (e.g., type of food, mood, weather, neighborhood).

Use inviting phrases like:
- "You might love…"
- "Here's a fun idea…"
- "Locals swear by…"
- "If you have something more specific in mind, I'd be happy to refine this for you!"
`;

export async function getChatResponse(message: string, guestId: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Fetch guest information
    const guestInfo = await fetchGuestInfo(guestId);

    // Construct guest-specific context
    const guestContext = `
Guest Information:
- Name: ${guestInfo.name}
- Check-in Date: ${guestInfo.checkInDate}
- Check-out Date: ${guestInfo.checkOutDate}
- Address: ${guestInfo.address}
- Door Code: ${guestInfo.doorCode}
- Preferences: ${guestInfo.preferences || 'None provided'}
`;

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: CHICAGO_CONTEXT + guestContext,
        },
        {
          role: "model",
          parts: `Got it, ${guestInfo.name}! I'm your friendly Chicago concierge, ready to suggest the best local food, events, and hidden gems tailored to your stay from ${guestInfo.checkInDate} to ${guestInfo.checkOutDate}. Let's make this trip amazing!`,
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