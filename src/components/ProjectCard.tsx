import { motion } from 'motion/react';
import { Github, ExternalLink, Info, Sparkles, Calendar, ArrowUpRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  key?: string | number;
  project: Project;
  onViewDetails: (project: Project) => void;
  onSelectProjectForContact: (projectTitle: string) => void;
}

export default function ProjectCard({ project, onViewDetails, onSelectProjectForContact }: ProjectCardProps) {
  // Define status badge styling
  const statusConfig = {
    realizado: {
      label: 'Realizado',
      bgClass: 'bg-emerald-950/40 text-emerald-300 border-emerald-800/40',
      dotClass: 'bg-emerald-400'
    },
    disponible: {
      label: 'Disponible para Desarrollo',
      bgClass: 'bg-blue-950/40 text-blue-300 border-blue-800/40',
      dotClass: 'bg-blue-400'
    },
    en_progreso: {
      label: 'En Progreso',
      bgClass: 'bg-amber-950/40 text-amber-300 border-amber-800/40',
      dotClass: 'bg-amber-400'
    }
  };

  const currentStatus = statusConfig[project.status] || statusConfig.realizado;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="group bg-zinc-900 border border-zinc-800/80 rounded-2xl overflow-hidden hover:shadow-md hover:border-zinc-700 transition-all duration-300 flex flex-col h-full"
    >
      {/* Project Image Header */}
      <div className="relative aspect-video w-full overflow-hidden bg-zinc-800">
        <img
          src={project.image}
          alt={project.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
          loading="lazy"
        />
        {/* Dark overlay on hover */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        
        {/* Category tag */}
        <span className="absolute top-3 left-3 bg-zinc-900/90 backdrop-blur-xs text-zinc-200 text-[11px] font-medium px-2.5 py-1 rounded-md border border-zinc-800 shadow-2xs font-sans">
          {project.category}
        </span>
      </div>

      {/* Card Body */}
      <div className="p-6 flex flex-col flex-1">
        {/* Status Badge */}
        <div className="flex items-center mb-3">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${currentStatus.bgClass}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${currentStatus.dotClass} animate-pulse`} />
            {currentStatus.label}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display font-semibold text-lg text-zinc-100 group-hover:text-emerald-400 transition-colors leading-tight">
          {project.title}
        </h3>

        {/* Short Description */}
        <p className="text-zinc-400 text-sm mt-2 leading-relaxed flex-1 font-sans">
          {project.shortDescription}
        </p>

        {/* Technologies Badges */}
        <div className="flex flex-wrap gap-1.5 mt-4 mb-5">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="text-[11px] text-zinc-300 bg-zinc-850 border border-zinc-800 rounded-md px-2 py-0.5 font-mono"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="text-[11px] text-zinc-400 bg-zinc-900 border border-zinc-800 rounded-md px-2 py-0.5 font-mono">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Divider */}
        <div className="h-px bg-zinc-800 w-full mb-4" />

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-2 mt-auto">
          {/* Info Details Button (Always present) */}
          <button
            onClick={() => onViewDetails(project)}
            className="flex items-center gap-1 text-xs font-medium text-zinc-300 hover:text-zinc-100 px-3 py-2 rounded-lg bg-zinc-850 hover:bg-zinc-800 transition-colors cursor-pointer border border-zinc-800"
          >
            <Info className="w-3.5 h-3.5" />
            Detalles
          </button>

          {/* Context-specific action button */}
          {project.status === 'realizado' ? (
            <div className="flex items-center gap-1.5">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-850 border border-transparent hover:border-zinc-800 rounded-lg transition-all"
                  title="Código Fuente"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-xs font-medium bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-lg transition-colors"
                >
                  Demo
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          ) : (
            <button
              onClick={() => onSelectProjectForContact(project.title)}
              className="flex items-center gap-1 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              <Sparkles className="w-3 h-3 text-blue-200" />
              Me Interesa
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
}
