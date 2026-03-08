import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react';
import toast from 'react-hot-toast';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const res = await axios.post('/api/contact', formData);
            if (res.data.success) {
                toast.success(res.data.message);
                setFormData({ name: '', email: '', subject: '', message: '' });
            }
        } catch (error: any) {
            if (error.response?.data?.errors) {
                error.response.data.errors.forEach((err: any) => {
                    toast.error(err.msg);
                });
            } else {
                toast.error('Something went wrong. Please try again later.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="section-padding bg-background w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="section-title">Get In Touch</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto mt-4">
                        Have a project in mind or want to discuss opportunities? I'd love to hear from you.
                    </p>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="w-full lg:w-1/3 space-y-8"
                    >
                        <div className="bg-card p-8 rounded-2xl border border-white/5 shadow-xl">
                            <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400 mt-1">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-gray-400 text-sm font-medium mb-1">Email</h4>
                                        <a href="mailto:vaibhav@example.com" className="text-white hover:text-cyan-400 transition-colors">
                                            vaibhav@example.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400 mt-1">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-gray-400 text-sm font-medium mb-1">Location</h4>
                                        <p className="text-white">
                                            Mumbai, India
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 pt-8 border-t border-white/5">
                                <h4 className="text-gray-400 text-sm font-medium mb-4">Connect on Socials</h4>
                                <div className="flex gap-4">
                                    <a href="#" className="p-3 bg-white/5 hover:bg-indigo-600 rounded-lg text-gray-300 hover:text-white transition-all"><Github size={20} /></a>
                                    <a href="#" className="p-3 bg-white/5 hover:bg-indigo-600 rounded-lg text-gray-300 hover:text-white transition-all"><Linkedin size={20} /></a>
                                    <a href="#" className="p-3 bg-white/5 hover:bg-indigo-600 rounded-lg text-gray-300 hover:text-white transition-all"><Twitter size={20} /></a>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="w-full lg:w-2/3"
                    >
                        <div className="bg-card p-8 rounded-2xl border border-white/5 shadow-xl">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-medium text-gray-300">Your Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-background border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-500 transition-shadow"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium text-gray-300">Your Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-background border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-500 transition-shadow"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="subject" className="text-sm font-medium text-gray-300">Subject</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        required
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-background border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-500 transition-shadow"
                                        placeholder="Project Inquiry"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium text-gray-300">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={5}
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-background border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-500 transition-shadow resize-none"
                                        placeholder="Hello Vaibhav, I would like to discuss..."
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                                    ) : (
                                        <>
                                            Send Message <Send size={18} />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
