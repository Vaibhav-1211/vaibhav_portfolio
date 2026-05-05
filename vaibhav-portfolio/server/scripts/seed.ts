import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import Profile from '../src/models/Profile';
import Skill from '../src/models/Skill';
import Experience from '../src/models/Experience';
import Project from '../src/models/Project';
import Education from '../src/models/Education';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const MONGODB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio';

const seedData = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB. Clearing existing data...');

    // Clear existing collections
    await Profile.deleteMany({});
    await Skill.deleteMany({});
    await Experience.deleteMany({});
    await Project.deleteMany({});
    await Education.deleteMany({});

    console.log('Inserting seed data...');

    // Profile
    await Profile.create({
      name: 'Vaibhav Kabira',
      role: 'Full Stack Developer',
      email: 'vaibhavkabira12@gmail.com',
      phone: '+91 83471 12233',
      location: 'Mumbai, India',
      linkedin: 'https://linkedin.com/in/yourprofile', // Placeholder
      github: 'https://github.com/yourprofile', // Placeholder
      summary: 'Full Stack Developer with 1.5+ years shipping production web applications in React and Python. Founding Engineer on a 0→production ERP for a manufacturing client — 10 modules, 22+ live API endpoints.',
    });

    // Skills
    await Skill.create([
      {
        category: 'Frontend',
        items: ['React.js', 'TypeScript', 'JavaScript (ES6+)', 'Redux', 'MUI', 'Recharts', 'HTML5', 'CSS3'],
        order: 1,
      },
      {
        category: 'Backend',
        items: ['Python', 'Django REST Framework', 'Flask', 'Node.js', 'NestJS', 'Express.js', 'GraphQL'],
        order: 2,
      },
      {
        category: 'Databases',
        items: ['PostgreSQL', 'MySQL', 'MongoDB'],
        order: 3,
      },
      {
        category: 'Cloud',
        items: ['AWS EC2', 'AWS S3', 'NGINX', 'Redis'],
        order: 4,
      },
      {
        category: 'Data & ETL',
        items: ['Apache Airflow', 'CSV Automation'],
        order: 5,
      },
      {
        category: 'Auth',
        items: ['OAuth 2.0', 'JWT', 'RBAC'],
        order: 6,
      },
      {
        category: 'AI & Tools',
        items: ['Cursor', 'Claude Code', 'Postman', 'Jira', 'ClickUp'],
        order: 7,
      },
    ]);

    // Experience
    await Experience.create([
      {
        title: 'Full Stack Developer',
        company: 'Carrigar.in by Tubematic',
        location: 'Mumbai',
        startDate: 'Nov 2025',
        endDate: 'Present',
        bullets: [
          'Founding Engineer on greenfield ERP (10 modules, 22+ DRF endpoints)',
          'Built React + MUI frontend with Recharts dashboards, KPI cards, skeleton loaders',
          'Resolved N+1 query issues, ORM optimization',
          'AWS S3 integration, PDF invoice + delivery challan generation',
          'Zero-defect go-live via regression testing across all endpoints',
          'AI-accelerated delivery with Cursor and Claude Code',
        ],
        order: 1,
      },
      {
        title: 'Junior Executive Developer',
        company: 'Stepin Solutions',
        location: 'Ahmedabad',
        startDate: 'Mar 2025',
        endDate: 'Nov 2025',
        bullets: [
          'Production ETL pipelines in Apache Airflow',
          'OAuth 2.0 + RBAC from scratch',
          'Deployed on AWS EC2 behind NGINX',
          'Node.js, NestJS, Express.js modules across Agile sprints',
        ],
        order: 2,
      },
      {
        title: 'Software Developer Intern',
        company: 'Statusi Pvt. Ltd.',
        location: 'Ahmedabad',
        startDate: 'Oct 2024',
        endDate: 'Feb 2025',
        bullets: [
          'REST API integration, production bug fixes, deployment workflows',
        ],
        order: 3,
      },
    ]);

    // Projects
    await Project.create([
      {
        title: 'ERP System — Tubematic India Pvt. Ltd.',
        description: '0→production ERP: 10 modules, 22+ ORM-aggregated API endpoints, AWS S3 storage, PDF generation, full QA. Founding Engineer, live with client.',
        stack: ['React', 'Django', 'DRF', 'PostgreSQL', 'AWS S3', 'MUI', 'Recharts'],
        order: 1,
        featured: true,
      },
      {
        title: 'Drip — Data Ingestion & ETL Platform',
        description: 'Production ETL platform: Airflow-scheduled pipelines, OAuth/RBAC, REST API-driven React frontend — deployed and maintained on AWS.',
        stack: ['React', 'Python', 'Flask', 'PostgreSQL', 'Apache Airflow', 'AWS EC2', 'NGINX'],
        order: 2,
        featured: true,
      },
      {
        title: 'Production Auth Hardening',
        description: 'Identified silent production failure where expired JWTs caused API failures. Implemented auto-refresh + retry in Node/Redux. Zero user disruption.',
        stack: ['Node.js', 'Express.js', 'React', 'Redux', 'JWT'],
        order: 3,
        featured: false,
      },
      {
        title: 'Blue Hornet — Field Mapping Module',
        description: 'Source-to-target field mapping end-to-end: NestJS APIs, React config screens, MongoDB-backed persistence.',
        stack: ['NestJS', 'React', 'MongoDB'],
        order: 4,
        featured: false,
      },
      {
        title: 'History Module — Connection-based Data Fetching',
        description: 'REST APIs for connection-based historical data retrieval with React frontend integration.',
        stack: ['Node.js', 'Express.js', 'React', 'MySQL'],
        order: 5,
        featured: false,
      },
    ]);

    // Education
    await Education.create([
      {
        degree: 'M.Sc. (CA & IT)',
        institution: 'K S School of Business Management and IT, Gujarat University',
        cgpa: '4.20 / 5.0',
        startYear: '2023', // Approximation based on typical dates
        endYear: '2025',
        order: 1,
      },
      {
        degree: 'B.Sc. (CA & IT)',
        institution: 'K S School of Business Management and IT, Gujarat University',
        cgpa: '3.58 / 5.0',
        startYear: '2020', // Approximation based on typical dates
        endYear: '2023',
        order: 2,
      },
    ]);

    console.log('Seed data inserted successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
