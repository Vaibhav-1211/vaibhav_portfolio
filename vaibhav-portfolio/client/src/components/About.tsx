import React, { useEffect, useState } from 'react';
import { motion, animate } from 'framer-motion';
import { Code2, GitMerge, Layout, Server } from 'lucide-react';

const stats = [
    { id: 1, name: 'Years Experience', value: 5, suffix: '+', icon: Layout },
    { id: 2, name: 'Projects Built', value: 50, suffix: '+', icon: Code2 },
    { id: 3, name: 'Technologies', value: 20, suffix: '+', icon: Server },
    { id: 4, name: 'Open Source', value: 10, suffix: '+', icon: GitMerge },
];

const Counter = ({ from, to }: { from: number; to: number }) => {
    const [count, setCount] = useState(from);

    useEffect(() => {
        const controls = animate(from, to, {
            duration: 2,
            onUpdate(value) {
                setCount(Math.round(value));
            },
            delay: 0.5,
        });

        return () => controls.stop();
    }, [from, to]);

    return <span>{count}</span>;
};

const About = () => {
    return (
        <section id="about" className="section-padding bg-background w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-16 items-center">

                    {/* Avatar column */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-1/2 flex justify-center"
                    >
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-cyan-400 to-purple-500 rounded-full blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative h-64 w-64 sm:h-80 sm:w-80 bg-card rounded-full flex items-center justify-center border-4 border-card overflow-hidden">
                                <span className="text-8xl sm:text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-indigo-400 to-cyan-300">
                                    VK
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Text and stats column */}
                    <div className="w-full lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="section-title">About Me</h2>

                            <div className="text-lg text-gray-300 space-y-4 mb-10">
                                <p>
                                    I'm a passionate full-stack developer with a keen eye for elegant design and a drive to solve complex technical challenges. I thrive in building software that not only looks great but performs flawlessly.
                                </p>
                                <p>
                                    With expertise across the modern web stack, I architect scalable applications from the ground up, ensuring clean, maintainable code and seamless user experiences.
                                </p>
                            </div>

                            {/* Stats grid */}
                            <div className="grid grid-cols-2 gap-4 sm:gap-6">
                                {stats.map((stat, idx) => {
                                    const Icon = stat.icon;
                                    return (
                                        <motion.div
                                            key={stat.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                                            className="bg-card p-6 rounded-2xl border border-white/5 shadow-xl flex flex-col items-center sm:items-start text-center sm:text-left hover:border-indigo-500/30 transition-colors"
                                        >
                                            <div className="p-3 bg-indigo-500/10 rounded-xl mb-4 text-indigo-400">
                                                <Icon size={24} />
                                            </div>
                                            <div className="text-3xl font-bold text-white flex items-baseline gap-1">
                                                <Counter from={0} to={stat.value} />
                                                <span className="text-cyan-400">{stat.suffix}</span>
                                            </div>
                                            <div className="text-sm text-gray-400 mt-1 font-medium">{stat.name}</div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default About;
