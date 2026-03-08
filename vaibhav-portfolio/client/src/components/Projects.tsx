import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Star } from 'lucide-react';

interface Project {
    id: string;
    title: string;
    description: string;
    stack: string[];
    category: 'frontend' | 'backend' | 'fullstack';
    featured: boolean;
    githubUrl?: string;
    liveUrl?: string;
}

const Projects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [filter, setFilter] = useState<'all' | 'frontend' | 'backend' | 'fullstack'>('all');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await axios.get('/api/projects');
                setProjects(res.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching projects:", error);
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const filteredProjects = projects.filter(p => filter === 'all' || p.category === filter);

    return (
        <section id="projects" className="section-padding bg-background/50 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="section-title">Featured Projects</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto mt-4">
                        A selection of my recent work, showcasing both frontend aesthetics and robust backend architectures.
                    </p>
                </motion.div>

                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                    </div>
                ) : (
                    <>
                        {/* Filters */}
                        <div className="flex flex-wrap justify-center gap-2 mb-12">
                            {['all', 'fullstack', 'frontend', 'backend'].map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f as any)}
                                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all capitalize ${filter === f
                                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                                            : 'bg-card text-gray-400 hover:text-white hover:bg-white/10 border border-white/5'
                                        }`}
                                >
                                    {f === 'all' ? 'All Projects' : f.replace('-', ' ')}
                                </button>
                            ))}
                        </div>

                        {/* Project Grid */}
                        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <AnimatePresence>
                                {filteredProjects.map((project) => (
                                    <motion.div
                                        key={project.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.3 }}
                                        whileHover={{ y: -10 }}
                                        className="group relative bg-[#12121a] rounded-2xl overflow-hidden border border-white/5 shadow-xl hover:shadow-2xl hover:shadow-indigo-500/20 transition-all flex flex-col h-full"
                                    >
                                        {/* Gradient top border effect */}
                                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                        {/* Placeholder image representation with a gradient */}
                                        <div className="h-48 w-full relative bg-gradient-to-br from-indigo-900/40 to-cyan-900/40 border-b border-white/5 flex items-center justify-center p-6">
                                            <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white/30 to-white/10">
                                                {project.title.substring(0, 2).toUpperCase()}
                                            </span>
                                            {project.featured && (
                                                <div className="absolute top-4 right-4 bg-indigo-500/20 text-indigo-300 text-xs px-3 py-1 rounded-full flex items-center gap-1 border border-indigo-500/30 backdrop-blur-md">
                                                    <Star size={12} fill="currentColor" /> Featured
                                                </div>
                                            )}
                                        </div>

                                        <div className="p-6 flex-grow flex flex-col">
                                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                                                {project.title}
                                            </h3>
                                            <p className="text-gray-400 text-sm mb-6 flex-grow">
                                                {project.description}
                                            </p>

                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {project.stack.map(tech => (
                                                    <span key={tech} className="text-xs font-medium px-2.5 py-1 bg-white/5 text-gray-300 rounded-md">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className="flex gap-4 pt-4 border-t border-white/5 mt-auto">
                                                {project.liveUrl && (
                                                    <a href={project.liveUrl} className="flex-1 flex items-center justify-center gap-2 py-2 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 rounded-lg transition-colors text-sm font-medium">
                                                        <ExternalLink size={16} /> Live Demo
                                                    </a>
                                                )}
                                                {project.githubUrl && (
                                                    <a href={project.githubUrl} className="flex-1 flex items-center justify-center gap-2 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors text-sm font-medium">
                                                        <Github size={16} /> GitHub
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    </>
                )}
            </div>
        </section>
    );
};

export default Projects;
