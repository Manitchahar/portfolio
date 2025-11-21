export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  image: string;
  stats: { label: string; value: string }[];
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: 'genesis' | 'code' | 'network' | 'godlike';
}

export enum AnimationState {
  IDLE,
  ANIMATING,
  COMPLETED
}
