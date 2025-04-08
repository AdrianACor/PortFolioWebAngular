export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demo: string;
  github: string;
  featured: boolean;
}

export interface Skill {
  name: string;
  icon: string;
  percentage: number;
}

export interface Database {
  name: string;
  icon: string;
}

export interface Tool {
  name: string;
  icon: string;
  color: string;
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
  icon: string;
}

export interface Experience {
  position: string;
  company: string;
  period: string;
  icon: string;
}

export interface ContactInfo {
  email: string;
  location: string;
  socials: {
    github: string;
    linkedin: string;
    twitter: string;
    dribbble?: string;
  };
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface PortfolioData {
  name: string;
  fullName: string;
  title: string;
  summary: string;
  bio: string;
  projects: Project[];
  frontendSkills: Skill[];
  backendSkills: Skill[];
  databases: Database[];
  tools: Tool[];
  education: Education[];
  experience: Experience[];
  contactInfo: ContactInfo;
  resumeLink: string;
}