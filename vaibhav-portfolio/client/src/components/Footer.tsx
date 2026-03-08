import React from 'react';
import { Github, Linkedin, Twitter, Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-card border-t border-white/5 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center border-b border-white/5 pb-8 mb-8 flex flex-col items-center">
                <a href="#hero" className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-cyan-400 mb-4 inline-block">
                    VK
                </a>
                <p className="text-gray-400 max-w-md mx-auto mb-8">
                    Building digital experiences that combine performance, elegant design, and robust architectures.
                </p>

                <div className="flex gap-4 mb-8">
                    <a href="#about" className="text-sm text-gray-400 hover:text-white transition-colors">About</a>
                    <a href="#skills" className="text-sm text-gray-400 hover:text-white transition-colors">Skills</a>
                    <a href="#projects" className="text-sm text-gray-400 hover:text-white transition-colors">Projects</a>
                    <a href="#experience" className="text-sm text-gray-400 hover:text-white transition-colors">Experience</a>
                    <a href="#contact" className="text-sm text-gray-400 hover:text-white transition-colors">Contact</a>
                </div>

                <div className="flex gap-6 justify-center">
                    <a href="#" className="text-gray-500 hover:text-white transition-colors"><Github size={20} /></a>
                    <a href="#" className="text-gray-500 hover:text-cyan-400 transition-colors"><Linkedin size={20} /></a>
                    <a href="#" className="text-gray-500 hover:text-indigo-400 transition-colors"><Twitter size={20} /></a>
                </div>
            </div>

            <div className="text-center text-sm text-gray-500 flex flex-col md:flex-row items-center justify-center gap-2">
                <p>© 2025 Vaibhav Kabira.</p>
                <p className="flex items-center gap-1">Built with React <Heart size={14} className="text-red-500" /> & Node.js</p>
            </div>
        </footer>
    );
};

export default Footer;
