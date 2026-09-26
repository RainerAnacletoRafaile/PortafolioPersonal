import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Github, Linkedin, MapPin, Copy, Check, ChevronDown, ArrowRight } from 'lucide-react';
import { PROFILE_INFO } from '../data';

export default function Header() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PROFILE_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="relative py-20 px-6 max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 border-b border-zinc-800/80">
      {/* Background radial accent */}
      <div className="absolute top-10 left-1/4 -z-10 w-72 h-72 bg-emerald-950/20 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-10 right-1/4 -z-10 w-72 h-72 bg-blue-950/20 rounded-full blur-3xl opacity-40" />

      {/* Avatar / Initials container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative group"
      >
        <div className="absolute -inset-1 bg-linear-to-r from-emerald-500 to-blue-500 rounded-full blur-sm opacity-25 group-hover:opacity-40 transition duration-1000"></div>
        <div className="relative w-36 h-36 md:w-44 md:h-44 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center shadow-xs overflow-hidden">
          {/* We generate an elegant initials emblem or a beautiful placeholder */}
          <div className="text-center">
            <span className="font-display font-bold text-4xl md:text-5xl bg-linear-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              RA
            </span>
            <div className="text-xs text-zinc-500 font-mono mt-1">&lt;dev/&gt;</div>
          </div>
        </div>
      </motion.div>

      {/* Profile Details */}
      <div className="flex-1 text-center md:text-left">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-950/40 text-emerald-300 text-xs font-medium rounded-full mb-4 border border-emerald-800/50">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
            </span>
            Disponible para Nuevos Proyectos
          </div>

          <h1 className="font-display font-bold text-4xl md:text-5xl tracking-tight text-zinc-100 leading-none">
            {PROFILE_INFO.name}
          </h1>
          <p className="font-display font-medium text-lg md:text-xl text-zinc-300 mt-3">
            {PROFILE_INFO.title}
          </p>

          <p className="text-zinc-400 max-w-2xl mt-4 leading-relaxed font-sans text-sm md:text-base">
            {PROFILE_INFO.bio}
          </p>
        </motion.div>

        {/* Meta Info: Location, Email copy */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center md:justify-start items-center gap-6 mt-6 text-sm text-zinc-400 font-sans"
        >
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-zinc-500" />
            <span>{PROFILE_INFO.location}</span>
          </div>

          {/* Copier */}
          <button 
            onClick={copyEmail}
            className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-850/80 border border-zinc-800 rounded-lg px-3 py-1.5 cursor-pointer transition-colors group relative"
            title="Copiar correo al portapapeles"
          >
            <Mail className="w-4 h-4 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
            <span className="font-mono text-xs">{PROFILE_INFO.email}</span>
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
            )}
            
            {/* Tooltip */}
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-800 text-zinc-200 text-[10px] px-2 py-1 rounded-sm opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200">
              {copied ? '¡Copiado!' : 'Copiar correo'}
            </span>
          </button>
        </motion.div>

        {/* Buttons & Social */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mt-8"
        >
          <button
            onClick={() => scrollToSection('projects')}
            className="w-full sm:w-auto px-6 py-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 text-sm font-medium rounded-xl flex items-center justify-center gap-2 shadow-xs cursor-pointer transition-all hover:translate-y-[-1px]"
          >
            Explorar Proyectos
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => scrollToSection('contact')}
            className="w-full sm:w-auto px-6 py-3 bg-zinc-900 hover:bg-zinc-850 text-zinc-200 text-sm font-medium border border-zinc-800 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all hover:translate-y-[-1px]"
          >
            Hablemos
          </button>

          {/* Social Links */}
          <div className="flex items-center gap-3 ml-2 mt-4 sm:mt-0">
            <a 
              href={PROFILE_INFO.github} 
              target="_blank" 
              rel="noreferrer"
              className="p-2.5 text-zinc-400 hover:text-zinc-100 border border-zinc-800 hover:border-zinc-700 rounded-xl bg-zinc-900 hover:shadow-xs transition-all"
              title="GitHub"
            >
              <Github className="w-4.5 h-4.5" />
            </a>
            <a 
              href={PROFILE_INFO.linkedin} 
              target="_blank" 
              rel="noreferrer"
              className="p-2.5 text-zinc-400 hover:text-blue-400 border border-zinc-800 hover:border-zinc-700 rounded-xl bg-zinc-900 hover:shadow-xs transition-all"
              title="LinkedIn"
            >
              <Linkedin className="w-4.5 h-4.5" />
            </a>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
