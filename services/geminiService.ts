import { GoogleGenAI, Content, Part } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

// NOTE: In a real production app, you might proxy this through a backend to hide the key.
// For this portfolio demo, we assume the key is safe or limited by referral.
const apiKey = process.env.API_KEY || ''; 

// Initialize Gemini
// We'll create the instance lazily to handle cases where the key isn't present immediately
let ai: GoogleGenAI | null = null;

const getAI = () => {
  if (!ai && apiKey) {
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
};

export const sendMessageToGemini = async (
  history: Content[], 
  newMessage: string
): Promise<string> => {
  const client = getAI();
  if (!client) {
    return "System Error: Neural Link Disconnected (Missing API Key). Please configure the environment.";
  }

  try {
    // We use generateContent for a single turn here, but maintaining history manually
    // allows us to control the context window strictly.
    // For a true chat, we can use ai.chats.create, but let's stay stateless for simplicity in this UI
    
    const model = "gemini-2.5-flash"; // Fast, efficient, smart

    // Construct the prompt with history context
    // In a real chat object, the SDK handles this, but here we format it for a single generation call
    // to ensure we always inject the system instruction freshly.
    
    const chatHistoryStr = history.map(h => {
        const role = h.role === 'user' ? 'User' : 'ManitAI';
        // Extract text from parts
        const text = h.parts.map((p: Part) => p.text).join(' ');
        return `${role}: ${text}`;
    }).join('\n');

    const finalPrompt = `
      ${SYSTEM_INSTRUCTION}
      
      Conversation History:
      ${chatHistoryStr}
      
      User: ${newMessage}
      ManitAI:
    `;

    const response = await client.models.generateContent({
      model: model,
      contents: finalPrompt,
      config: {
        temperature: 0.7,
        maxOutputTokens: 300, 
      }
    });

    return response.text || "Thinking process interrupted...";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error: Cognitive overload. Please try again later.";
  }
};
