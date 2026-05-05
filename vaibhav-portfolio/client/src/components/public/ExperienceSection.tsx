import { useExperience } from '../../hooks/queries';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

const ExperienceSection = () => {
  const { data: experience, isLoading } = useExperience();

  if (isLoading || !experience) return null;

  return (
    <section id="experience" className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">Work Experience</h2>
          <div className="relative border-l-2 border-blue-200 dark:border-blue-900 ml-3 md:ml-6">
            {experience.map((job, index) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="mb-10 ml-8 relative"
              >
                <span className="absolute -left-12 flex items-center justify-center w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full ring-4 ring-white dark:ring-gray-800">
                  <Briefcase className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </span>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl shadow-sm">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{job.title}</h3>
                      <p className="text-lg font-medium text-blue-600 dark:text-blue-400">{job.company}</p>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-2 md:mt-0 bg-white dark:bg-gray-800 px-3 py-1 rounded-full w-fit">
                      {job.startDate} — {job.endDate} • {job.location}
                    </div>
                  </div>
                  <ul className="list-disc list-outside ml-4 space-y-2 text-gray-600 dark:text-gray-300">
                    {job.bullets.map((bullet, i) => (
                      <li key={i} className="pl-1 leading-relaxed">{bullet}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
