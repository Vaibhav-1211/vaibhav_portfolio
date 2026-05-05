export interface IProfile {
  _id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github?: string;
  summary: string;
  profilePhoto?: string;
}

export interface ISkill {
  _id: string;
  category: string;
  items: string[];
  order: number;
}

export interface IExperience {
  _id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  bullets: string[];
  order: number;
}

export interface IProject {
  _id: string;
  title: string;
  description: string;
  stack: string[];
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
  order: number;
  featured: boolean;
}

export interface IEducation {
  _id: string;
  degree: string;
  institution: string;
  cgpa: string;
  startYear: string;
  endYear: string;
  order: number;
}

export interface IContactMessage {
  _id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
}
