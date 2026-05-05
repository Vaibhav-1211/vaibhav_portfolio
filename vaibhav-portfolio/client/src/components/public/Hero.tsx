import { useProfile } from '../../hooks/queries';
import { motion } from 'framer-motion';

const Hero = () => {
  const { data: profile, isLoading } = useProfile();

  if (isLoading) return <div className="h-screen flex items-center justify-center">Loading...</div>;
  if (!profile) return null;

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {profile.profilePhoto && (
            <img
              src={profile.profilePhoto}
              alt={profile.name}
              className="w-32 h-32 rounded-full mx-auto mb-8 object-cover border-4 border-blue-500 shadow-lg"
            />
          )}
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-4">
            Hi, I'm <span className="text-blue-600 dark:text-blue-400">{profile.name}</span>
          </h1>
          <h2 className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 mb-8 font-light">
            {profile.role}
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400 mb-10">
            {profile.summary}
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="#contact"
              className="px-8 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors shadow-md"
            >
              Get in Touch
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white rounded-full font-medium hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors shadow-md"
            >
              GitHub
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
