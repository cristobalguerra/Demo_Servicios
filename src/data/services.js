import {
  Wind, Wrench, Thermometer, Zap, ToggleLeft, CircuitBoard,
  Lamp, Search, ShieldCheck
} from 'lucide-react';

export const services = [
  {
    id: 'instalacion-climas',
    name: 'Instalación de Climas',
    description: 'Instalación profesional de minisplit, central o ventana con garantía.',
    price: '$2,500',
    time: '2–4 hrs',
    icon: Wind,
    category: 'clima',
  },
  {
    id: 'mantenimiento-ac',
    name: 'Mantenimiento de A/C',
    description: 'Limpieza profunda, recarga de gas y revisión completa del sistema.',
    price: '$800',
    time: '1–2 hrs',
    icon: Thermometer,
    category: 'clima',
  },
  {
    id: 'reparacion-climas',
    name: 'Reparación de Climas',
    description: 'Diagnóstico y reparación de fallas en cualquier tipo de clima.',
    price: '$600',
    time: '1–3 hrs',
    icon: Wrench,
    category: 'clima',
  },
  {
    id: 'electrico-residencial',
    name: 'Servicios Eléctricos Residenciales',
    description: 'Instalación, reparación y mantenimiento eléctrico para tu hogar.',
    price: '$500',
    time: '1–2 hrs',
    icon: Zap,
    category: 'electrico',
  },
  {
    id: 'contactos-interruptores',
    name: 'Cambio de Contactos e Interruptores',
    description: 'Sustitución segura de contactos, apagadores y accesorios eléctricos.',
    price: '$250',
    time: '30–60 min',
    icon: ToggleLeft,
    category: 'electrico',
  },
  {
    id: 'tableros-electricos',
    name: 'Revisión de Tableros Eléctricos',
    description: 'Inspección, balanceo de cargas y mantenimiento preventivo.',
    price: '$700',
    time: '1–2 hrs',
    icon: CircuitBoard,
    category: 'electrico',
  },
  {
    id: 'lamparas-ventiladores',
    name: 'Instalación de Lámparas y Ventiladores',
    description: 'Montaje e instalación segura de luminarias y ventiladores de techo.',
    price: '$350',
    time: '1–2 hrs',
    icon: Lamp,
    category: 'electrico',
  },
  {
    id: 'diagnostico',
    name: 'Diagnóstico Técnico',
    description: 'Evaluación profesional para identificar fallas y proponer soluciones.',
    price: '$400',
    time: '1 hr',
    icon: Search,
    category: 'general',
  },
  {
    id: 'mantenimiento-preventivo',
    name: 'Mantenimiento Preventivo',
    description: 'Plan integral de revisión periódica para evitar fallas costosas.',
    price: '$1,200',
    time: '2–3 hrs',
    icon: ShieldCheck,
    category: 'general',
  },
];

export const zones = [
  { id: 'san-pedro', name: 'San Pedro Garza García', covered: true },
  { id: 'monterrey-centro', name: 'Monterrey Centro', covered: true },
  { id: 'cumbres', name: 'Cumbres', covered: true },
  { id: 'san-nicolas', name: 'San Nicolás de los Garza', covered: true },
  { id: 'guadalupe', name: 'Guadalupe', covered: true },
  { id: 'apodaca', name: 'Apodaca', covered: true },
  { id: 'santa-catarina', name: 'Santa Catarina', covered: true },
  { id: 'escobedo', name: 'General Escobedo', covered: false },
  { id: 'juarez', name: 'Juárez', covered: false },
  { id: 'garcia', name: 'García', covered: false },
];

export const testimonials = [
  {
    name: 'María González',
    role: 'San Pedro Garza García',
    text: 'Excelente servicio. El técnico llegó puntual, diagnosticó el problema rápidamente y dejó mi clima funcionando perfecto. Muy profesionales.',
    rating: 5,
    service: 'Reparación de Climas',
  },
  {
    name: 'Roberto Treviño',
    role: 'Cumbres',
    text: 'Contraté el mantenimiento preventivo para mi oficina. El equipo fue muy organizado y el precio muy justo. Ya agendé el siguiente servicio.',
    rating: 5,
    service: 'Mantenimiento Preventivo',
  },
  {
    name: 'Ana Laura Martínez',
    role: 'Monterrey Centro',
    text: 'Me instalaron 3 minisplits en mi departamento. Todo quedó impecable y me explicaron cómo darles el mejor uso. Totalmente recomendados.',
    rating: 5,
    service: 'Instalación de Climas',
  },
  {
    name: 'Carlos Mendoza',
    role: 'San Nicolás',
    text: 'Tuve un cortocircuito en mi casa y llegaron el mismo día. Resolvieron todo rápido y seguro. Muy agradecido con el servicio.',
    rating: 5,
    service: 'Servicios Eléctricos',
  },
  {
    name: 'Laura Villarreal',
    role: 'Guadalupe',
    text: 'El chatbot me ayudó a encontrar el servicio que necesitaba y agendar en minutos. La experiencia completa fue excelente desde el primer contacto.',
    rating: 4,
    service: 'Diagnóstico Técnico',
  },
];

export const timeSlots = ['9:00 AM', '11:00 AM', '1:00 PM', '4:00 PM', '6:00 PM'];

export const propertyTypes = ['Casa', 'Departamento', 'Oficina', 'Local Comercial', 'Bodega', 'Otro'];
