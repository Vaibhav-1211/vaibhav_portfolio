import { Link } from 'react-router-dom';
import { useProfile, useProjects, useMessages } from '../../hooks/queries';
import { User, FolderGit2, Mail, ArrowRight } from 'lucide-react';

const Dashboard = () => {
  const { data: profile } = useProfile();
  const { data: projects } = useProjects();
  const { data: messages } = useMessages();

  const stats = [
    { label: 'Profile', value: profile?.name || 'Loading...', icon: User, path: '/admin/profile', color: 'bg-blue-500' },
    { label: 'Projects', value: projects?.length || 0, icon: FolderGit2, path: '/admin/projects', color: 'bg-green-500' },
    { label: 'Unread Messages', value: messages?.filter(m => !m.read).length || 0, icon: Mail, path: '/admin/messages', color: 'bg-purple-500' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10 dark:bg-opacity-20`}>
                  <Icon className={`w-6 h-6 text-${stat.color.split('-')[1]}-600 dark:text-${stat.color.split('-')[1]}-400`} />
                </div>
              </div>
              <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">{stat.label}</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{stat.value}</p>
              <Link to={stat.path} className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                Manage <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          );
        })}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/admin/projects" className="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-center font-medium hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
            Add Project
          </Link>
          <Link to="/admin/experience" className="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-center font-medium hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
            Add Experience
          </Link>
          <Link to="/admin/skills" className="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-center font-medium hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
            Edit Skills
          </Link>
          <Link to="/admin/profile" className="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-center font-medium hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
            Update Resume
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
