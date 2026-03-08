import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

const EXPERIENCES = [
    {
        id: 1,
        role: "Senior Full Stack Developer",
        company: "TechCorp Inc.",
        period: "Jan 2022 – Present",
        description: "Built microservices architecture, led team of 5, improved performance by 40%",
    },
    {
        id: 2,
        role: "Full Stack Developer",
        company: "StartupHub",
        period: "Jun 2020 – Dec 2021",
        description: "Developed React + Node.js SaaS product from scratch, 10k+ users",
    },
    {
        id: 3,
        role: "Frontend Developer",
        company: "WebAgency",
        period: "Jan 2019 – May 2020",
        description: "Built 20+ client websites, introduced TypeScript to the team",
    }
];

const Experience = () => {
    return (
        <section id="experience" className="section-padding bg-background relative overflow-hidden">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="section-title">Professional Journey</h2>
                </motion.div>

                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-0.5 bg-white/10 md:-translate-x-1/2"></div>

                    <div className="space-y-12 relative">
                        {EXPERIENCES.map((exp, index) => {
                            const isEven = index % 2 === 0;

                            return (
                                <motion.div
                                    key={exp.id}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.6, delay: 0.1 }}
                                    className={`flex flex-col md:flex-row items-start ${isEven ? 'md:flex-row-reverse' : ''} gap-8 relative z-10`}
                                >

                                    {/* Timeline Dot */}
                                    <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-card border-4 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.6)] -translate-x-[15px] md:-translate-x-1/2 flex items-center justify-center top-0 mt-[1.25rem] md:mt-[1.25rem]"></div>

                                    {/* Content Box */}
                                    <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-12 text-left md:text-right' : 'md:pl-12 text-left'}`}>
                                        <div className="bg-card p-6 rounded-2xl border border-white/5 shadow-xl hover:border-indigo-500/30 transition-colors inline-block w-full group">
                                            <div className={`flex flex-col ${isEven ? 'md:items-end' : 'md:items-start'} mb-3`}>
                                                <div className="flex items-center gap-2 text-indigo-400 font-semibold mb-1">
                                                    <Briefcase size={16} className={`${isEven ? 'md:order-last' : ''}`} />
                                                    <span>{exp.company}</span>
                                                </div>
                                                <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                                                    {exp.role}
                                                </h3>
                                            </div>
                                            <div className="text-sm font-medium text-gray-500 mb-4 inline-block px-3 py-1 bg-white/5 rounded-full">
                                                {exp.period}
                                            </div>
                                            <p className="text-gray-300 leading-relaxed">
                                                {exp.description}
                                            </p>
                                        </div>
                                    </div>

                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
