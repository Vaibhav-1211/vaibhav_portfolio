import Header from '../components/public/Header';
import Hero from '../components/public/Hero';
import About from '../components/public/About';
import SkillsSection from '../components/public/SkillsSection';
import ExperienceSection from '../components/public/ExperienceSection';
import ProjectsSection from '../components/public/ProjectsSection';
import EducationSection from '../components/public/EducationSection';
import ContactSection from '../components/public/ContactSection';

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-sans selection:bg-blue-200 dark:selection:bg-blue-900">
      <Header />
      <main>
        <Hero />
        <About />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <EducationSection />
        <ContactSection />
      </main>
      <footer className="py-8 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} Vaibhav Kabira. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Portfolio;
