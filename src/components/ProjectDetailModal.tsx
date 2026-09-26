import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, ExternalLink, Github, Calendar, Tag, Briefcase, Sparkles } from 'lucide-react';
import { Project } from '../types';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onSelectProjectForContact: (projectTitle: string) => void;
}

export default function ProjectDetailModal({ project, onClose, onSelectProjectForContact }: ProjectDetailModalProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const statusConfig = {
    realizado: {
      label: 'Realizado con Éxito',
      badgeClass: 'bg-emerald-950/40 text-emerald-300 border-emerald-800/40'
    },
    disponible: {
      label: 'Disponible para Implementar',
      badgeClass: 'bg-blue-950/40 text-blue-300 border-blue-800/40'
    },
    en_progreso: {
      label: 'Actualmente en Desarrollo',
      badgeClass: 'bg-amber-950/40 text-amber-300 border-amber-800/40'
    }
  };

  const statusInfo = statusConfig[project.status] || statusConfig.realizado;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-xs"
        />

        {/* Modal Card Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3 }}
          className="relative bg-zinc-900 rounded-2xl shadow-xl border border-zinc-800 max-w-3xl w-full overflow-hidden z-10 max-h-[90vh] flex flex-col text-zinc-100"
        >
          {/* Header Image with close button */}
          <div className="relative aspect-video w-full max-h-56 overflow-hidden bg-zinc-950">
            <img
              src={project.image}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            {/* Close button inside image */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-zinc-950/85 hover:bg-zinc-900 backdrop-blur-xs p-2 rounded-full text-zinc-300 hover:text-zinc-100 transition-colors shadow-sm cursor-pointer border border-zinc-800/30"
              title="Cerrar detalles"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-6 right-6 text-white">
              <span className="text-[10px] uppercase font-mono tracking-widest px-2 py-0.5 bg-zinc-900/50 backdrop-blur-xs rounded-sm border border-zinc-700/50">
                {project.category}
              </span>
              <h2 className="font-display font-bold text-xl md:text-2xl mt-1 leading-tight text-zinc-100">
                {project.title}
              </h2>
            </div>
          </div>

          {/* Modal scrollable body */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-8 bg-zinc-900">
            
            {/* Left side: descriptions & features */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 font-mono mb-2">
                  Acerca del Proyecto
                </h4>
                <p className="text-zinc-300 text-sm leading-relaxed font-sans">
                  {project.longDescription}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 font-mono mb-3">
                  Características Clave
                </h4>
                <ul className="space-y-2.5">
                  {project.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-zinc-300 font-sans">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right side: tech info metadata & stack */}
            <div className="space-y-6 border-t md:border-t-0 md:border-l border-zinc-850 pt-6 md:pt-0 md:pl-6">
              
              {/* Project Status */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-mono">
                  Estado
                </span>
                <div className={`mt-1 text-xs font-medium px-2.5 py-1 rounded-md border text-center ${statusInfo.badgeClass}`}>
                  {statusInfo.label}
                </div>
              </div>

              {/* Rol / Role */}
              <div className="flex items-start gap-2.5 text-sm">
                <Briefcase className="w-4 h-4 text-zinc-500 mt-0.5 shrink-0" />
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-mono">
                    Mi Rol
                  </span>
                  <span className="text-zinc-300 font-medium">{project.role}</span>
                </div>
              </div>

              {/* Fecha / Dates */}
              <div className="flex items-start gap-2.5 text-sm">
                <Calendar className="w-4 h-4 text-zinc-500 mt-0.5 shrink-0" />
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-mono">
                    Duración / Lanzamiento
                  </span>
                  <span className="text-zinc-300 font-medium">
                    {project.startDate} {project.endDate ? ` - ${project.endDate}` : ''}
                  </span>
                </div>
              </div>

              {/* Tecnologías / Tech Stack list */}
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-mono mb-2">
                  Tecnologías Utilizadas
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] text-zinc-300 bg-zinc-850 border border-zinc-800 rounded px-2 py-0.5 font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Modal Action Footer */}
          <div className="bg-zinc-950 px-6 py-4 border-t border-zinc-850 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={onClose}
              className="text-xs font-medium text-zinc-400 hover:text-zinc-200 px-4 py-2 rounded-lg cursor-pointer transition-colors"
            >
              Cerrar
            </button>

            <div className="flex items-center gap-2">
              {project.status === 'realizado' ? (
                <>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 text-xs font-medium text-zinc-300 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 px-4 py-2 rounded-lg transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      Código Fuente
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 text-xs font-medium text-white bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg transition-colors"
                    >
                      Probar Demo
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </>
              ) : (
                <button
                  onClick={() => {
                    onSelectProjectForContact(project.title);
                    onClose();
                  }}
                  className="flex items-center gap-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-lg transition-colors cursor-pointer shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-blue-200" />
                  Me Interesa Desarrollar Esto
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
