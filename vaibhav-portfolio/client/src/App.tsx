import React from 'react';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
    return (
        <div className="min-h-screen bg-background text-text selection:bg-indigo-500/30">
            <Toaster
                position="bottom-right"
                toastOptions={{
                    style: {
                        background: '#12121a',
                        color: '#e2e8f0',
                        border: '1px solid rgba(255,255,255,0.05)',
                    }
                }}
            />
            <Navbar />
            <main>
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Experience />
                <Contact />
            </main>
            <Footer />
        </div>
    );
}

export default App;
