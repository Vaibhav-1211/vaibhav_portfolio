export interface Project {
    id: string;
    title: string;
    description: string;
    stack: string[];
    category: 'frontend' | 'backend' | 'fullstack';
    featured: boolean;
    githubUrl?: string;
    liveUrl?: string;
}

export interface SkillCategory {
    category: string;
    skills: { name: string; level: number }[];
}

export const projects: Project[] = [
    {
        id: "1",
        title: "DevConnect",
        description: "A real-time developer collaboration platform.",
        stack: ["React", "Node.js", "Socket.io", "MongoDB"],
        category: "fullstack",
        featured: true,
        githubUrl: "#",
        liveUrl: "#"
    },
    {
        id: "2",
        title: "ShopNest",
        description: "E-commerce platform with cart, auth, payments.",
        stack: ["Next.js", "Express", "PostgreSQL", "Stripe"],
        category: "fullstack",
        featured: true,
        githubUrl: "#",
        liveUrl: "#"
    },
    {
        id: "3",
        title: "UIKit Pro",
        description: "A component library with 50+ accessible components.",
        stack: ["React", "TypeScript", "Storybook", "Rollup"],
        category: "frontend",
        featured: false,
        githubUrl: "#",
        liveUrl: "#"
    },
    {
        id: "4",
        title: "LogStream",
        description: "Centralized log aggregation microservice.",
        stack: ["Node.js", "Redis", "Docker", "AWS"],
        category: "backend",
        featured: false,
        githubUrl: "#"
    }
];

export const skills: SkillCategory[] = [
    {
        category: "Frontend",
        skills: [
            { name: "React", level: 95 },
            { name: "TypeScript", level: 90 },
            { name: "Next.js", level: 85 },
            { name: "Tailwind CSS", level: 90 },
            { name: "Redux", level: 80 }
        ]
    },
    {
        category: "Backend",
        skills: [
            { name: "Node.js", level: 92 },
            { name: "Express", level: 90 },
            { name: "REST APIs", level: 95 },
            { name: "GraphQL", level: 75 }
        ]
    },
    {
        category: "Database",
        skills: [
            { name: "MongoDB", level: 88 },
            { name: "PostgreSQL", level: 85 },
            { name: "Redis", level: 80 }
        ]
    },
    {
        category: "DevOps",
        skills: [
            { name: "Git", level: 95 },
            { name: "Linux", level: 82 },
            { name: "CI/CD", level: 80 },
            { name: "Docker", level: 78 },
            { name: "AWS", level: 72 }
        ]
    }
];
