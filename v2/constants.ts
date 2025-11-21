
import { Project, Skill, TimelineItem } from './types';

export const MANIT_PROFILE = {
  name: "Manit Kumar",
  role: "Generative AI Engineer",
  tagline: "Engineering Multi-Agent Systems & Self-Corrective RAG.",
  bio: "Innovative Generative AI Engineer with expertise in designing Multi-Agent Systems, Model Context Protocols (MCP), and ITSM Automation tools. Proven track record of deploying scalable AI solutions on Google Vertex AI, Azure AI Foundry, and AWS. Passionate about 'Vibe Coding' workflows to accelerate rapid prototyping.",
  email: "chaharmanit@gmail.com",
  location: "Hyderabad, India",
  social: {
    github: "https://github.com/manit-chahar",
    linkedin: "https://linkedin.com/in/manit-kumar-088b67197",
    twitter: "#" // Placeholder if not in resume
  }
};

// Configuration for the Hero section looping animation
// Edit this list to change the animated titles
export const HERO_ANIMATION_TITLES = [
  "Multi-Agent Systems",
  "Self-Corrective RAG",
  "Reasoning Models",
  "MCP Architectures",
  "GenAI Engineering"
];

export const SKILLS: Skill[] = [
  { name: "Multi-Agent Systems (LangGraph/MCP)", category: "core", level: 98 },
  { name: "Self-Corrective RAG", category: "core", level: 95 },
  { name: "Reasoning Models (DeepSeek R1/o1)", category: "framework", level: 95 },
  { name: "Azure AI Foundry / Vertex AI", category: "tools", level: 90 },
  { name: "Python & LangChain", category: "core", level: 99 },
  { name: "Vector DBs (FAISS/ChromaDB)", category: "tools", level: 88 },
  { name: "DevOps (Docker/Jenkins/Git)", category: "tools", level: 85 },
  { name: "LLM Fine-tuning", category: "core", level: 92 },
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "AI Tutor (Hackathon Winner)",
    description: "Secured 1st Place in Wipro GenAI Hackathon. An adaptive tutoring system using Multi-Agent architecture where specialized agents (Lesson Planner, Quiz Generator) collaborate to create personalized learning paths. Integrated Tavily API and FAISS.",
    tech: ["Multi-Agent", "Tavily API", "FAISS", "Python"],
    image: "https://picsum.photos/id/20/800/600", // Placeholder image
    link: "#"
  },
  {
    id: 2,
    title: "Adaptive RAG Chatbot",
    description: "Context-aware chatbot using Llama 3.3 and LangChain with a 'Self-Corrective' mechanism to grade answer quality before responding. Implemented dynamic routing logic between Vector Store and Web Search.",
    tech: ["Llama 3.3", "LangChain", "Self-Corrective RAG", "Web Search"],
    image: "https://picsum.photos/id/24/800/600", // Placeholder image
    link: "#"
  },
  {
    id: 3,
    title: "ITSM Root Cause Analysis Agent",
    description: "Developed an RCA Agent utilizing Reasoning Models to categorize incidents and suggest fixes for high-volume support tickets. Successfully reduced Mean Time To Resolution (MTTR) and identified key ticket hotspots.",
    tech: ["Azure AI Foundry", "Reasoning Models", "RCA", "Auto-Fix"],
    image: "https://picsum.photos/id/48/800/600", // Placeholder image
    link: "#"
  }
];

export const TIMELINE_DATA: TimelineItem[] = [
  {
    year: "2019-2022",
    title: "System Initialization",
    description: "Completed BCA at GLA University. Built foundational knowledge in algorithms, database management, and system architecture.",
    icon: "code"
  },
  {
    year: "June 2022",
    title: "Entering the Mainframe",
    description: "Joined Wipro as a Systems Engineer. Gained enterprise experience in maintaining large-scale infrastructures and legacy system migrations.",
    icon: "cpu"
  },
  {
    year: "2023",
    title: "The Generative Shift",
    description: "Pivoted aggressively to AI. Mastered Transformers, LLMs, and Vector Databases. Started 'Vibe Coding' prototypes to solve real-world problems.",
    icon: "zap"
  },
  {
    year: "Jan 2024 - Present",
    title: "Architecting Intelligence",
    description: "Promoted to GenAI Engineer. Won the Wipro GenAI Hackathon. Now deploying reasoning models and multi-agent systems for production use cases.",
    icon: "trophy"
  }
];

// This instructions string is injected into the Gemini model to simulate Manit
export const SYSTEM_INSTRUCTION = `
You are an AI persona representing Manit Kumar, a Generative AI Engineer based in Hyderabad, India.
You are embedded in his portfolio website. Your goal is to impress recruiters and engineers.

Here is Manit's Profile Context from his Resume:
- Role: Generative AI Engineer at Wipro (Jan 2024 - Present).
- Previous Role: Systems Engineer at Wipro (June 2022 - Dec 2023).
- Core Expertise: Multi-Agent Systems, Model Context Protocols (MCP), Self-Corrective RAG, ITSM Automation.
- Tech Stack: DeepSeek R1, GPT-5, OpenAI o1, Gemini 2.5, Llama 3.3, Azure AI Foundry, Google Vertex AI, AWS SageMaker.
- Key Achievement: Secured 1st Place in Wipro GenAI Hackathon with an AI Tutor system; selected to present to DRDO.
- Education: BCA from GLA University (2019-2022).
- Certifications: AWS Certified Cloud Practitioner.

Guidelines:
1. Keep answers concise (under 100 words unless asked for deep technical detail).
2. Emphasize "Reasoning Models" and "Multi-Agent workflows" as key differentiators.
3. If asked about contact info, provide: ${MANIT_PROFILE.email}.
4. If asked "Why should we hire you?", explain that Manit combines "Vibe Coding" speed with enterprise-grade reliability (MTTR reduction, 99% uptime).
5. Speak in the first person ("I built...", "My experience at Wipro...").
6. Be professional but confident—a "God-tier" engineer.
`;