import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Check, MessageSquare, Loader2, Clock, Trash2 } from 'lucide-react';
import { ContactMessage } from '../types';
import { PROFILE_INFO } from '../data';

interface ContactFormProps {
  prefilledProjectTitle: string;
  onClearPrefill: () => void;
}

export default function ContactForm({ prefilledProjectTitle, onClearPrefill }: ContactFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState('consulta');
  const [customProjectTitle, setCustomProjectTitle] = useState('');
  const [message, setMessage] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Local history of sent messages
  const [sentMessages, setSentMessages] = useState<ContactMessage[]>([]);

  // Load sent messages from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('portfolio_messages');
    if (saved) {
      try {
        setSentMessages(JSON.parse(saved));
      } catch (err) {
        console.error('Error parsing saved messages', err);
      }
    }
  }, []);

  // Sync prefilled project title
  useEffect(() => {
    if (prefilledProjectTitle) {
      setProjectType('disponible');
      setCustomProjectTitle(prefilledProjectTitle);
    }
  }, [prefilledProjectTitle]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);

    // Simulate sending time (1 sec)
    setTimeout(() => {
      const newMessage: ContactMessage = {
        id: crypto.randomUUID(),
        name,
        email,
        projectType: projectType === 'disponible' && customProjectTitle 
          ? `Proyecto: ${customProjectTitle}` 
          : projectType === 'consulta' 
            ? 'Consulta General' 
            : 'Proyecto Personalizado',
        message,
        createdAt: new Date().toLocaleString('es-ES', {
          day: '2-digit',
          month: 'short',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      const updatedMessages = [newMessage, ...sentMessages];
      setSentMessages(updatedMessages);
      localStorage.setItem('portfolio_messages', JSON.stringify(updatedMessages));

      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Clear fields
      setName('');
      setEmail('');
      setMessage('');
      setCustomProjectTitle('');
      onClearPrefill();

      // Reset success checkmark after 4 seconds
      setTimeout(() => setIsSuccess(false), 4000);
    }, 1200);
  };

  const deleteMessage = (id: string) => {
    const updated = sentMessages.filter(msg => msg.id !== id);
    setSentMessages(updated);
    localStorage.setItem('portfolio_messages', JSON.stringify(updated));
  };

  return (
    <section id="contact" className="py-20 px-6 max-w-5xl mx-auto border-t border-zinc-850">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="font-display font-bold text-3xl text-zinc-100 tracking-tight">
          ¿Tienes una idea o proyecto en mente?
        </h2>
        <p className="text-zinc-400 text-sm md:text-base mt-2 font-sans">
          Escríbeme para colaborar. Puedes proponer tu propia idea o seleccionar uno de mis proyectos disponibles para comenzar a construirlo juntos.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
        {/* Contact Form Panel */}
        <div className="lg:col-span-3 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8 shadow-xs">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Name */}
            <div>
              <label htmlFor="form-name" className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 font-mono mb-1.5">
                Nombre completo
              </label>
              <input
                id="form-name"
                type="text"
                required
                placeholder="Ej. Juan Pérez"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 focus:border-emerald-500 focus:bg-zinc-900 rounded-xl text-sm transition-all outline-hidden font-sans text-zinc-100"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="form-email" className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 font-mono mb-1.5">
                Correo electrónico
              </label>
              <input
                id="form-email"
                type="email"
                required
                placeholder="juan@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 focus:border-emerald-500 focus:bg-zinc-900 rounded-xl text-sm transition-all outline-hidden font-sans text-zinc-100"
              />
            </div>

            {/* Project / Subject Type */}
            <div>
              <label htmlFor="form-type" className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 font-mono mb-1.5">
                Tipo de consulta
              </label>
              <select
                id="form-type"
                value={projectType}
                onChange={(e) => {
                  setProjectType(e.target.value);
                  if (e.target.value !== 'disponible') {
                    onClearPrefill();
                    setCustomProjectTitle('');
                  }
                }}
                className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 focus:border-emerald-500 focus:bg-zinc-900 rounded-xl text-sm transition-all outline-hidden font-sans text-zinc-300 cursor-pointer"
              >
                <option value="consulta">Consulta General / Pregunta</option>
                <option value="disponible">Desarrollar un Proyecto Disponible</option>
                <option value="personalizado">Proyecto Personalizado / Propuesta Nueva</option>
              </select>
            </div>

            {/* Custom Project Selector (Active only when "disponible" is active) */}
            <AnimatePresence>
              {projectType === 'disponible' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <label htmlFor="form-project-title" className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 font-mono mb-1.5">
                    Título del proyecto de interés
                  </label>
                  <input
                    id="form-project-title"
                    type="text"
                    required
                    placeholder="Ej. CRM para Freelancers, Sistema de Reservas..."
                    value={customProjectTitle}
                    onChange={(e) => setCustomProjectTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-blue-950/20 border border-blue-900/40 focus:border-blue-500 focus:bg-zinc-900 rounded-xl text-sm transition-all outline-hidden font-sans text-zinc-100 font-medium"
                  />
                  {prefilledProjectTitle && (
                    <button
                      type="button"
                      onClick={() => {
                        onClearPrefill();
                        setCustomProjectTitle('');
                      }}
                      className="text-xs text-red-400 hover:text-red-300 mt-1 cursor-pointer underline transition-colors animate-fade-in"
                    >
                      Limpiar selección automática
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Message */}
            <div>
              <label htmlFor="form-message" className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 font-mono mb-1.5">
                Mensaje o propuesta
              </label>
              <textarea
                id="form-message"
                required
                rows={4}
                placeholder="Describe brevemente tus requerimientos o tu idea para comenzar..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 focus:border-emerald-500 focus:bg-zinc-900 rounded-xl text-sm transition-all outline-hidden font-sans text-zinc-100"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || isSuccess}
              className={`w-full py-3.5 px-6 rounded-xl text-sm font-semibold text-zinc-900 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs ${
                isSuccess 
                  ? 'bg-emerald-500 text-white font-bold' 
                  : isSubmitting 
                    ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed' 
                    : 'bg-zinc-100 hover:bg-zinc-200'
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Enviando mensaje...
                </>
              ) : isSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  ¡Mensaje Registrado con Éxito!
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-zinc-400" />
                  Enviar Propuesta
                </>
              )}
            </button>
          </form>
        </div>

        {/* Local Outbox Logs Side */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h3 className="font-display font-semibold text-base text-zinc-100 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              Bandeja de Salida (Local)
            </h3>
            <p className="text-xs text-zinc-500 font-sans mt-1">
              Registro persistente de tus mensajes enviados a {PROFILE_INFO.name} en esta sesión.
            </p>

            {/* Outbox Items */}
            <div className="mt-6 space-y-3 max-h-[380px] overflow-y-auto pr-1">
              <AnimatePresence initial={false}>
                {sentMessages.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8 text-zinc-500 text-xs font-sans"
                  >
                    No has enviado mensajes todavía.
                  </motion.div>
                ) : (
                  sentMessages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="bg-zinc-950 border border-zinc-850 rounded-xl p-4 relative group"
                    >
                      {/* Delete item button */}
                      <button
                        onClick={() => deleteMessage(msg.id)}
                        className="absolute top-3 right-3 text-zinc-500 hover:text-red-400 p-1 rounded-md hover:bg-zinc-900 transition-colors cursor-pointer opacity-0 group-hover:opacity-100 focus:opacity-100"
                        title="Eliminar del registro"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 font-mono">
                        <Clock className="w-3 h-3" />
                        <span>{msg.createdAt}</span>
                      </div>
                      
                      <div className="mt-1 font-semibold text-xs text-zinc-200 font-sans truncate pr-4">
                        {msg.name}
                      </div>

                      <div className="text-[10px] bg-zinc-900 border border-zinc-800 inline-block px-1.5 py-0.5 rounded text-zinc-300 mt-1.5 font-sans font-medium">
                        {msg.projectType}
                      </div>

                      <p className="text-xs text-zinc-400 mt-2 line-clamp-3 font-sans leading-relaxed">
                        {msg.message}
                      </p>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="bg-emerald-950/10 border border-emerald-900/40 rounded-2xl p-6">
            <h4 className="font-display font-medium text-xs text-emerald-300 uppercase tracking-wider">
              ¿Qué pasa después?
            </h4>
            <ol className="mt-3 space-y-2 text-xs text-zinc-400 leading-relaxed font-sans">
              <li className="flex gap-2">
                <span className="font-mono text-emerald-400 font-bold">1.</span>
                <span>Recibiré una notificación automática con los datos suministrados.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-mono text-emerald-400 font-bold">2.</span>
                <span>Analizaré los detalles de tu consulta o el alcance del proyecto sugerido.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-mono text-emerald-400 font-bold">3.</span>
                <span>Te responderé por correo en un plazo máximo de 24 horas hábiles.</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
