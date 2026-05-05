import { useProfile } from '../../hooks/queries';
import { Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  const { data: profile, isLoading } = useProfile();

  if (isLoading || !profile) return null;

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">About Me</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">My Background</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                {profile.summary}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Contact Info</h3>
              <div className="space-y-4">
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <Mail className="w-5 h-5 mr-4 text-blue-600 dark:text-blue-400" />
                  <a href={`mailto:${profile.email}`} className="hover:text-blue-600 dark:hover:text-blue-400">{profile.email}</a>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <Phone className="w-5 h-5 mr-4 text-blue-600 dark:text-blue-400" />
                  <a href={`tel:${profile.phone}`} className="hover:text-blue-600 dark:hover:text-blue-400">{profile.phone}</a>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <MapPin className="w-5 h-5 mr-4 text-blue-600 dark:text-blue-400" />
                  <span>{profile.location}</span>
                </div>
                <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700 flex space-x-4">
                  <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                    <Github className="w-6 h-6" />
                  </a>
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    <Linkedin className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
