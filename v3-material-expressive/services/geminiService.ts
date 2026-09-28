import { GoogleGenAI } from "@google/genai";

// Initialize the client only when needed to ensure API key is present
let aiClient: GoogleGenAI | null = null;

const getClient = (): GoogleGenAI => {
  if (!aiClient) {
    // Using a default empty string to prevent crash if env is missing during dev, 
    // but ideally this should be set.
    const apiKey = process.env.API_KEY || ''; 
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
};

export const chatWithOracle = async (userPrompt: string): Promise<string> => {
  try {
    const ai = getClient();
    
    // Using the flash model for quick, witty responses suitable for a portfolio interaction
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction: "You are 'Aether', a digital consciousness and portfolio assistant. You are futuristic, slightly cryptic, but helpful. Keep answers concise (under 50 words) and techno-philosophical.",
        temperature: 0.9,
      }
    });

    return response.text || "The neural link is silent. Try again.";
  } catch (error) {
    console.error("Oracle Error:", error);
    return "Interference detected in the void. Connection failed.";
  }
};
