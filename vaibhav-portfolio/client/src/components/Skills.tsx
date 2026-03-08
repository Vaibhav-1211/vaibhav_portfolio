import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

interface Skill {
    name: string;
    level: number;
}

interface SkillCategory {
    category: string;
    skills: Skill[];
}

const Skills = () => {
    const [categories, setCategories] = useState<SkillCategory[]>([]);
    const [activeCategory, setActiveCategory] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const res = await axios.get('/api/skills');
                setCategories(res.data);
                if (res.data.length > 0) {
                    setActiveCategory(res.data[0].category);
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching skills:", error);
                setLoading(false);
            }
        };

        fetchSkills();
    }, []);

    const activeSkills = categories.find(c => c.category === activeCategory)?.skills || [];

    return (
        <section id="skills" className="section-padding bg-background/50 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="section-title">Technical Arsenal</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto mt-4">
                        A comprehensive overview of my technical skills and proficiency levels across the stack.
                    </p>
                </motion.div>

                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center">
                        {/* Tabs */}
                        <div className="flex flex-wrap justify-center gap-2 mb-12 p-1 bg-card rounded-2xl border border-white/5">
                            {categories.map((cat) => (
                                <button
                                    key={cat.category}
                                    onClick={() => setActiveCategory(cat.category)}
                                    className={`px-6 py-3 rounded-xl font-medium transition-all ${activeCategory === cat.category
                                            ? 'bg-indigo-600 text-white shadow-lg'
                                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    {cat.category}
                                </button>
                            ))}
                        </div>

                        {/* Skill Grid */}
                        <motion.div
                            key={activeCategory} // Force re-animation on tab change
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full"
                        >
                            {activeSkills.map((skill, index) => (
                                <div key={skill.name} className="bg-card p-6 rounded-2xl border border-white/5 shadow-lg group hover:border-cyan-500/30 transition-all">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="font-semibold text-white group-hover:text-cyan-400 transition-colors flex items-center gap-2">
                                            {skill.name}
                                        </span>
                                        <span className="text-sm font-medium text-gray-400">{skill.level}%</span>
                                    </div>

                                    {/* Progress Bar Background */}
                                    <div className="w-full h-2.5 bg-gray-800 rounded-full overflow-hidden">
                                        {/* Animated Progress */}
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${skill.level}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1, delay: 0.1 + index * 0.05, ease: "easeOut" }}
                                            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400"
                                        />
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Skills;
