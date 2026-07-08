export interface ProjectCredit {
  role: string;
  name: string;
}

export interface Project {
  id: string;
  title: string;
  client: string;
  year: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  videoUrl: string;
  thumbnail: string;
  coverVideo?: string;
  orientation: "landscape" | "portrait" | "square";
  featured: boolean;
  duration: string;
  role: string[];
  tools: string[];
  services: string[];
  challenge: string;
  solution: string;
  results: string[];
  gallery: string[];
  credits: ProjectCredit[];
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  text: string;
  projectId?: string;
}

export interface Service {
  number: string;
  title: string;
  description: string;
}
