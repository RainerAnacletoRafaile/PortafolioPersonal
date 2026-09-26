import { Project } from './types';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'eco-shop',
    title: 'EcoMarket - E-commerce Sostenible',
    shortDescription: 'Plataforma de comercio electrónico enfocada en productos ecológicos y huella de carbono cero.',
    longDescription: 'EcoMarket es una tienda virtual completa que ayuda a los usuarios a comprar productos ecológicos. Incluye una calculadora de huella de carbono integrada para compensar las emisiones del envío y un panel de administración interactivo para gestionar inventario.',
    status: 'realizado',
    category: 'Fullstack',
    technologies: ['React', 'Node.js', 'Express', 'Tailwind CSS', 'Vite'],
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800',
    githubUrl: 'https://github.com/example/ecomarket',
    demoUrl: 'https://ecomarket-demo.netlify.app',
    startDate: 'Ene 2026',
    endDate: 'Mar 2026',
    role: 'Desarrollador Fullstack Principal',
    features: [
      'Carrito de compras interactivo con persistencia local.',
      'Pasarela de pago simulada y calculadora de impacto ecológico.',
      'Filtros dinámicos por categorías de sostenibilidad.',
      'Panel de control para la administración de productos.'
    ]
  },
  {
    id: 'kanban-board',
    title: 'TaskFlow - Gestor de Tareas Kanban',
    shortDescription: 'Un tablero interactivo estilo Trello con animaciones fluidas y organización de tareas.',
    longDescription: 'TaskFlow es una herramienta visual de productividad diseñada para equipos pequeños y profesionales independientes. Permite crear, arrastrar y priorizar tareas de manera intuitiva con transiciones impecables y almacenamiento en el navegador.',
    status: 'realizado',
    category: 'Frontend',
    technologies: ['React', 'Tailwind CSS', 'Motion', 'TypeScript'],
    image: 'https://images.unsplash.com/photo-1611224885990-ab7363d1f2a9?auto=format&fit=crop&q=80&w=800',
    githubUrl: 'https://github.com/example/taskflow',
    demoUrl: 'https://taskflow-kanban.netlify.app',
    startDate: 'Feb 2026',
    endDate: 'Feb 2026',
    role: 'Desarrollador Frontend',
    features: [
      'Tablero de arrastrar y soltar (Drag and Drop) intuitivo.',
      'Creación, edición y eliminación de tareas y columnas.',
      'Filtros por etiquetas de prioridad (Baja, Media, Alta).',
      'Persistencia de datos 100% offline usando LocalStorage.'
    ]
  },
  {
    id: 'saas-dashboard',
    title: 'SaaS Analytics Dashboard',
    shortDescription: 'Dashboard interactivo de métricas financieras y retención de usuarios con gráficos en tiempo real.',
    longDescription: 'Panel de control de analíticas avanzadas que procesa y visualiza indicadores clave de rendimiento (KPIs) como MRR, LTV, y tasa de abandono (churn), ofreciendo reportes exportables y gráficos interactivos personalizables.',
    status: 'realizado',
    category: 'Frontend',
    technologies: ['React', 'Recharts', 'Tailwind CSS', 'Lucide Icons'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    githubUrl: 'https://github.com/example/analytics-dashboard',
    demoUrl: 'https://analytics-saas-dashboard.netlify.app',
    startDate: 'Abr 2026',
    endDate: 'May 2026',
    role: 'Desarrollador Frontend & UX UI',
    features: [
      'Gráficos de área, líneas y barras interactivos usando Recharts.',
      'Sincronización con mock de APIs para actualizaciones en vivo.',
      'Filtro de rango de fechas dinámico (7d, 30d, 12m).',
      'Diseño responsivo optimizado para tabletas y dispositivos móviles.'
    ]
  },
  {
    id: 'freelance-crm',
    title: 'CRM para Freelancers (Disponible)',
    shortDescription: 'Estructura lista para implementar un gestor de clientes, cotizaciones y plazos de entrega.',
    longDescription: 'Una plantilla y arquitectura base diseñada para freelancers que necesitan organizar sus proyectos en desarrollo, registrar cobros, emitir presupuestos en PDF y recordar hitos importantes. ¡Disponible para adaptar a tus necesidades!',
    status: 'disponible',
    category: 'Fullstack / Template',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'PDF Generation'],
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
    startDate: 'Disponible para desarrollo',
    role: 'Tu Próximo Proyecto',
    features: [
      'Gestión unificada de clientes con historial de contactos.',
      'Generador de presupuestos formalizados descargables en PDF.',
      'Calendario de entregas interactivo con recordatorios.',
      'Integración opcional con alertas por correo o WhatsApp.'
    ]
  },
  {
    id: 'spa-booking',
    title: 'Sistema de Reservas para Pymes',
    shortDescription: 'Plataforma de agendamiento y reserva de turnos modular para salones, spas y consultorios.',
    longDescription: 'Un sistema ágil enfocado en la experiencia del cliente final, permitiendo seleccionar servicios, elegir profesionales y reservar turnos en menos de un minuto, con notificaciones automáticas y panel de horarios para el comercio.',
    status: 'disponible',
    category: 'Web App',
    technologies: ['React', 'Tailwind CSS', 'Calendar Components', 'Mobile First'],
    image: 'https://images.unsplash.com/photo-1521568852439-0d94cec28009?auto=format&fit=crop&q=80&w=800',
    startDate: 'Disponible para desarrollo',
    role: 'Tu Próximo Proyecto',
    features: [
      'Visualización de agenda libre y ocupada en tiempo real.',
      'Bloqueo inteligente de horarios no laborales y feriados.',
      'Soporte multi-idioma y adaptabilidad 100% móvil.',
      'Flujo de cancelación y re-programación automatizado.'
    ]
  },
  {
    id: 'portfolio-builder',
    title: 'Creador de Portafolios Dinámico',
    shortDescription: 'Plataforma para que creadores y programadores generen su portafolio visual en minutos.',
    longDescription: 'Un software en fase de desarrollo activo que permitirá rellenar un formulario intuitivo, elegir una plantilla moderna y exportar un sitio estático optimizado listo para Netlify, Vercel o GitHub Pages.',
    status: 'en_progreso',
    category: 'Fullstack',
    technologies: ['React', 'Tailwind CSS', 'Motion', 'Node.js'],
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800',
    startDate: 'Jun 2026',
    role: 'Desarrollador Principal',
    features: [
      'Editor visual de secciones con previsualización en vivo.',
      'Exportador directo a archivo ZIP con HTML/CSS/React estático.',
      'Integración con GitHub API para publicación automática.',
      'Colección de 5 plantillas minimalistas de alta gama.'
    ]
  }
];

export const PROFILE_INFO = {
  name: 'Rainer Anacleto',
  title: 'Desarrollador Fullstack & Diseñador de Interfaces',
  bio: 'Me apasiona crear productos digitales que combinen una programación robusta con un diseño visual impecable, limpio y orientado al usuario. Especializado en React, TypeScript y arquitecturas web ligeras listas para producción.',
  location: 'Lima, Perú',
  email: 'raineranacleto8@gmail.com',
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
  cvUrl: '#',
  skills: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Express', 'Vite', 'Git', 'Motion']
};
