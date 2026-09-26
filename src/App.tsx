import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Code, Star } from 'lucide-react';
import { INITIAL_PROJECTS, PROFILE_INFO } from './data';
import { Project } from './types';
import Header from './components/Header';
import ProjectCard from './components/ProjectCard';
import ProjectDetailModal from './components/ProjectDetailModal';
import ContactForm from './components/ContactForm';

export default function App() {
  const [projects] = useState<Project[]>(INITIAL_PROJECTS);
  
  // Modal state
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Prefill state for contact form
  const [contactPrefill, setContactPrefill] = useState<string>('');

  // Handle setting prefilled project and scrolling to contact form
  const handleSelectProjectForContact = (projectTitle: string) => {
    setContactPrefill(projectTitle);
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-emerald-950 selection:text-emerald-200 antialiased">
      
      {/* Hero / Header Profile Section */}
      <Header />

      <main className="py-16 max-w-5xl mx-auto px-6">
        
        {/* Projects Section */}
        <section id="projects" className="scroll-mt-10">
          
          {/* Header of Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="font-display font-bold text-3xl text-zinc-100 tracking-tight flex items-center gap-2">
                <Code className="w-6 h-6 text-emerald-500" />
                Catálogo de Proyectos
              </h2>
              <p className="text-zinc-400 text-sm mt-1 font-sans">
                Explora mis aplicaciones desarrolladas y propuestas listas para iniciar.
              </p>
            </div>
          </div>

          {/* Grid of projects */}
          <div className="relative">
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onViewDetails={setSelectedProject}
                  onSelectProjectForContact={handleSelectProjectForContact}
                />
              ))}
            </motion.div>
          </div>
        </section>

        {/* Contact Form Section */}
        <ContactForm 
          prefilledProjectTitle={contactPrefill}
          onClearPrefill={() => setContactPrefill('')}
        />

      </main>

      {/* Footer */}
      <footer className="bg-zinc-900/40 border-t border-zinc-800/80 py-12 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-zinc-400 font-sans">
          <div>
            <div className="font-display font-bold text-zinc-200 text-base">
              {PROFILE_INFO.name}
            </div>
            <p className="text-xs text-zinc-500 mt-1">
              Desarrollador Web Fullstack • Diseñado para Netlify
            </p>
          </div>

          <div className="flex items-center gap-6 text-xs text-zinc-500 font-mono">
            <span>© 2026 Rainer Anacleto</span>
            <span className="hidden md:inline">•</span>
            <span className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              Sencillo &amp; Rápido
            </span>
          </div>
        </div>
      </footer>

      {/* Detail Modal Component */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onSelectProjectForContact={handleSelectProjectForContact}
      />

    </div>
  );
}

