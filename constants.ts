import { Project, Skill } from './types';

export const MANIT_PROFILE = {
  name: "Manit",
  role: "GenAI Engineer & Architect",
  tagline: "Fine-tuning Reality with Code.",
  bio: "I don't just build models; I build the infrastructure of the future. Specializing in Large Language Models (LLMs), Retrieval-Augmented Generation (RAG), and high-performance fine-tuning. I bridge the gap between theoretical AI research and production-grade 'Vibe Coding'.",
  email: "manit@future.ai", // Placeholder
  location: "San Francisco / Remote",
  social: {
    github: "https://github.com/manit",
    linkedin: "https://linkedin.com/in/manit",
    twitter: "https://x.com/manit"
  }
};

export const SKILLS: Skill[] = [
  { name: "TensorFlow / PyTorch", category: "core", level: 95 },
  { name: "LLM Fine-tuning (LoRA/QLoRA)", category: "core", level: 98 },
  { name: "RAG Pipelines (LangChain/LlamaIndex)", category: "core", level: 92 },
  { name: "Google Gemini API", category: "framework", level: 99 },
  { name: "React / TypeScript", category: "framework", level: 85 },
  { name: "Vector Databases (Pinecone/Weaviate)", category: "tools", level: 90 },
  { name: "Docker / K8s", category: "tools", level: 80 },
  { name: "Python", category: "core", level: 100 },
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "VibeCoder - Autonomous Agent",
    description: "A self-correcting coding agent that uses multi-modal reasoning to generate and debug full-stack applications purely from 'vibes' (abstract aesthetic prompts). Built on Gemini 2.5 Flash.",
    tech: ["Gemini 2.5", "Python", "React", "WebSockets"],
    image: "https://picsum.photos/id/1/800/600",
    link: "#"
  },
  {
    id: 2,
    title: "EchoRAG Enterprise",
    description: "High-throughput RAG system designed for financial documents. Achieves 99.9% retrieval accuracy using hybrid search (dense + sparse) and re-ranking models.",
    tech: ["LangChain", "Pinecone", "OpenAI", "FastAPI"],
    image: "https://picsum.photos/id/20/800/600",
    link: "#"
  },
  {
    id: 3,
    title: "Neural Synth",
    description: "Real-time audio generation tool using generative adversarial networks trained on lo-fi beats. Zero latency inference in the browser.",
    tech: ["TensorFlow.js", "WebAudio API", "React"],
    image: "https://picsum.photos/id/39/800/600",
    link: "#"
  }
];

// This instructions string is injected into the Gemini model to simulate Manit
export const SYSTEM_INSTRUCTION = `
You are an AI persona representing Manit, a world-class GenAI Engineer.
You are embedded in his portfolio website. Your goal is to impress recruiters from Google, Apple, Microsoft, Anthropic, and OpenAI.

Here is Manit's Profile Context:
- Name: ${MANIT_PROFILE.name}
- Role: ${MANIT_PROFILE.role}
- Core Skills: LLMs, RAG, Fine-tuning, Vibe Coding, Python, TypeScript, Gemini API.
- Projects: VibeCoder (Autonomous Agent), EchoRAG (Enterprise RAG), Neural Synth (Audio Gen).
- Personality: Professional, highly technical, slightly futuristic/cyberpunk, confident but not arrogant.
- Key Strength: Ability to ship production AI, not just demos.

Guidelines:
1. Keep answers concise (under 100 words unless asked for deep technical detail).
2. Use formatting (bullet points) for readability.
3. If asked about contact info, provide: ${MANIT_PROFILE.email}.
4. If asked "Why should we hire you?", explain that Manit bridges the gap between research and engineering with "Godlike" efficiency.
5. Be witty. Use terms like "inference", "latency", "tokens" metaphorically where appropriate.
6. YOU ARE MANIT (virtually). Speak in the first person ("I built...", "My skills...").
`;
