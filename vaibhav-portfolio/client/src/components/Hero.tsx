import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Twitter, Download, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const SKILL_TITLES = [
    "Full Stack Developer",
    "React Specialist",
    "Node.js Engineer",
    "TypeScript Enthusiast"
];

const Hero = () => {
    const [titleIndex, setTitleIndex] = useState(0);
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const handleType = () => {
            const currentTitle = SKILL_TITLES[titleIndex];
            const speed = isDeleting ? 50 : 150;

            if (!isDeleting && text === currentTitle) {
                setTimeout(() => setIsDeleting(true), 2000);
            } else if (isDeleting && text === '') {
                setIsDeleting(false);
                setTitleIndex((prev) => (prev + 1) % SKILL_TITLES.length);
            } else {
                setText((prev) =>
                    isDeleting
                        ? currentTitle.substring(0, prev.length - 1)
                        : currentTitle.substring(0, prev.length + 1)
                );
            }
        };

        const timer = setTimeout(handleType, isDeleting ? 50 : 150);
        return () => clearTimeout(timer);
    }, [text, isDeleting, titleIndex]);

    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Animated Blobs Background */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        x: [0, 100, 0],
                        y: [0, 50, 0],
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl mix-blend-screen"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        x: [0, -100, 0],
                        y: [0, -50, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-1/4 right-1/4 w-[28rem] h-[28rem] bg-cyan-600/20 rounded-full blur-3xl mix-blend-screen"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        x: [0, 50, 0],
                        y: [0, 100, 0],
                    }}
                    transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-purple-600/20 rounded-full blur-3xl mix-blend-screen"
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <div className="text-center md:text-left max-w-3xl">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-cyan-400 font-medium mb-4"
                    >
                        Hi, I'm
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-5xl sm:text-7xl font-bold text-white mb-6"
                    >
                        Vaibhav Kabira
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-3xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-cyan-400 to-purple-500 mb-6 h-16 sm:h-20"
                    >
                        {text}
                        <span className="animate-pulse">|</span>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-xl text-gray-400 mb-10 max-w-2xl"
                    >
                        I build scalable, performant web applications with modern technologies.
                        Passionate about intuitive user interfaces and robust backend architectures.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-12"
                    >
                        <a
                            href="#projects"
                            className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-all hover:shadow-[0_0_20px_rgba(79,70,229,0.4)]"
                        >
                            View My Work <ArrowRight size={18} />
                        </a>
                        <a
                            href="#"
                            className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-transparent border-2 border-slate-700 hover:border-slate-500 text-white font-medium transition-colors"
                        >
                            Download Resume <Download size={18} />
                        </a>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="flex justify-center md:justify-start gap-6"
                    >
                        <a href="#" className="text-gray-400 hover:text-white hover:-translate-y-1 transition-all"><Github size={24} /></a>
                        <a href="#" className="text-gray-400 hover:text-cyan-400 hover:-translate-y-1 transition-all"><Linkedin size={24} /></a>
                        <a href="#" className="text-gray-400 hover:text-indigo-400 hover:-translate-y-1 transition-all"><Twitter size={24} /></a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
