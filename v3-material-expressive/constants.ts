import { Project, TimelineEvent } from './types';

export const HERO_KEYWORDS = [
  "Multi-Agent Systems",
  "Model Context Protocol",
  "Reasoning Models",
  "Self-Corrective RAG",
  "Vibe Coding"
];

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Personalized AI Tutor',
    category: 'Multi-Agent System',
    description: 'Award-winning adaptive tutoring system (Wipro GenAI Hackathon Winner). Orchestrates specialized agents (Lesson Planner, Quiz Generator, Grader) to create personalized learning paths using Tavily API and FAISS.',
    tech: ['Multi-Agent', 'Tavily API', 'FAISS', 'Python'],
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1000&auto=format&fit=crop',
    stats: [{ label: 'Rank', value: '1st Place' }, { label: 'Retrieval', value: 'Real-time' }]
  },
  {
    id: 'p2',
    title: 'Adaptive RAG Chatbot',
    category: 'Reasoning Engine',
    description: 'Context-aware system using Llama 3.3 and LangChain. Features "Self-Corrective" logic to grade answers and dynamic routing between Vector Store retrieval and Web Search based on query complexity.',
    tech: ['Llama 3.3', 'LangChain', 'Web Search', 'RAG'],
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop',
    stats: [{ label: 'Logic', value: 'Self-Correct' }, { label: 'Model', value: 'Llama 3.3' }]
  },
  {
    id: 'p3',
    title: 'ITSM Automation Suite',
    category: 'Enterprise AI',
    description: 'Internal AI suite utilizing Azure AI Foundry and Reasoning Models (DeepSeek/o1) for Root Cause Analysis (RCA). Successfully categorized high-volume support tickets and reduced Mean Time To Resolution.',
    tech: ['Azure AI', 'RCA Agent', 'DeepSeek', 'Python'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
    stats: [{ label: 'Impact', value: 'Lower MTTR' }, { label: 'Uptime', value: '99%' }]
  },
  {
    id: 'p4',
    title: 'MCP Nexus Bridge',
    category: 'Protocol Integration',
    description: 'Implementation of Model Context Protocol (MCP) to standardize tool usage across enterprise RAG chatbots, enabling seamless interoperability between isolated agents and data pipelines.',
    tech: ['MCP', 'GPT-5', 'Vertex AI', 'TypeScript'],
    image: 'https://images.unsplash.com/photo-1558494949-efc0257bb3af?q=80&w=1000&auto=format&fit=crop',
    stats: [{ label: 'Std', value: 'MCP' }, { label: 'Integration', value: 'Universal' }]
  }
];

export const TIMELINE: TimelineEvent[] = [
  {
    year: '2019',
    title: 'Foundation',
    description: 'Started Bachelor of Computer Applications (BCA) at GLA University. The journey into logic and code begins.',
    icon: 'genesis'
  },
  {
    year: '2022',
    title: 'Systems Engineering',
    description: 'Joined Wipro as Systems Engineer. Managed cloud infrastructure on AWS/Azure for major enterprise clients, achieving 99% uptime. Built initial SageMaker prototypes.',
    icon: 'code'
  },
  {
    year: '2024',
    title: 'Generative Evolution',
    description: 'Advanced to Generative AI Developer. designing Multi-Agent workflows, implementing MCP, and deploying fine-tuned models on Google Vertex AI and Azure AI Foundry.',
    icon: 'network'
  },
  {
    year: 'Future',
    title: 'Reasoning Architect',
    description: 'Pushing the boundaries with Reasoning Models (DeepSeek R1, o1) and "Vibe Coding" to accelerate rapid prototyping and delivery.',
    icon: 'godlike'
  }
];