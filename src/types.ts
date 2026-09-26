export type ProjectStatus = 'realizado' | 'disponible' | 'en_progreso';

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  status: ProjectStatus;
  category: string;
  technologies: string[];
  image: string;
  githubUrl?: string;
  demoUrl?: string;
  startDate: string;
  endDate?: string;
  features: string[];
  role: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  projectType: string;
  message: string;
  createdAt: string;
}
