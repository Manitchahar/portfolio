export enum Section {
  HERO = 'hero',
  ABOUT = 'about',
  JOURNEY = 'journey',
  STACK = 'stack',
  PROJECTS = 'projects',
  CHAT = 'chat',
  CONTACT = 'contact'
}

export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  image: string;
  link?: string;
}

export interface Message {
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
  isError?: boolean;
}

export interface Skill {
  name: string;
  category: 'core' | 'framework' | 'tools';
  level: number; // 0-100
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon: 'code' | 'cpu' | 'trophy' | 'zap';
}