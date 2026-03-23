import { db } from './firebase'
import { collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore'

const SERVICIOS = [
  { nombre: 'Instalación de Climas', descripcion: 'Instalación profesional de minisplit, central o ventana con garantía.', precio_base: 2500, duracion: '2–4 hrs', categoria: 'clima', icono: 'Wind', orden: 1, activo: true },
  { nombre: 'Mantenimiento de A/C', descripcion: 'Limpieza profunda, recarga de gas y revisión completa del sistema.', precio_base: 800, duracion: '1–2 hrs', categoria: 'clima', icono: 'Thermometer', orden: 2, activo: true },
  { nombre: 'Reparación de Climas', descripcion: 'Diagnóstico y reparación de fallas en cualquier tipo de clima.', precio_base: 600, duracion: '1–3 hrs', categoria: 'clima', icono: 'Wrench', orden: 3, activo: true },
  { nombre: 'Servicios Eléctricos Residenciales', descripcion: 'Instalación, reparación y mantenimiento eléctrico para tu hogar.', precio_base: 500, duracion: '1–2 hrs', categoria: 'electrico', icono: 'Zap', orden: 4, activo: true },
  { nombre: 'Cambio de Contactos e Interruptores', descripcion: 'Sustitución segura de contactos, apagadores y accesorios eléctricos.', precio_base: 250, duracion: '30–60 min', categoria: 'electrico', icono: 'ToggleLeft', orden: 5, activo: true },
  { nombre: 'Revisión de Tableros Eléctricos', descripcion: 'Inspección, balanceo de cargas y mantenimiento preventivo.', precio_base: 700, duracion: '1–2 hrs', categoria: 'electrico', icono: 'CircuitBoard', orden: 6, activo: true },
  { nombre: 'Instalación de Lámparas y Ventiladores', descripcion: 'Montaje e instalación segura de luminarias y ventiladores de techo.', precio_base: 350, duracion: '1–2 hrs', categoria: 'electrico', icono: 'Lamp', orden: 7, activo: true },
  { nombre: 'Diagnóstico Técnico', descripcion: 'Evaluación profesional para identificar fallas y proponer soluciones.', precio_base: 400, duracion: '1 hr', categoria: 'general', icono: 'Search', orden: 8, activo: true },
  { nombre: 'Mantenimiento Preventivo', descripcion: 'Plan integral de revisión periódica para evitar fallas costosas.', precio_base: 1200, duracion: '2–3 hrs', categoria: 'general', icono: 'ShieldCheck', orden: 9, activo: true },
]

const ZONAS = [
  { nombre: 'San Pedro Garza García', cubierta: true, orden: 1 },
  { nombre: 'Monterrey Centro', cubierta: true, orden: 2 },
  { nombre: 'Cumbres', cubierta: true, orden: 3 },
  { nombre: 'San Nicolás de los Garza', cubierta: true, orden: 4 },
  { nombre: 'Guadalupe', cubierta: true, orden: 5 },
  { nombre: 'Apodaca', cubierta: true, orden: 6 },
  { nombre: 'Santa Catarina', cubierta: true, orden: 7 },
  { nombre: 'General Escobedo', cubierta: false, orden: 8 },
  { nombre: 'Juárez', cubierta: false, orden: 9 },
  { nombre: 'García', cubierta: false, orden: 10 },
]

const TECNICOS = [
  { nombre: 'Carlos Ramírez', telefono: '81-1111-2222', email: 'carlos@tecnihome.mx', especialidades: ['clima', 'general'], zonas: ['San Pedro Garza García', 'Monterrey Centro', 'Cumbres'], activo: true, horarios: [
    { dia: 'Lunes', inicio: '08:00', fin: '19:00', disponible: true },
    { dia: 'Martes', inicio: '08:00', fin: '19:00', disponible: true },
    { dia: 'Miércoles', inicio: '08:00', fin: '19:00', disponible: true },
    { dia: 'Jueves', inicio: '08:00', fin: '19:00', disponible: true },
    { dia: 'Viernes', inicio: '08:00', fin: '19:00', disponible: true },
    { dia: 'Sábado', inicio: '09:00', fin: '15:00', disponible: true },
  ]},
  { nombre: 'Miguel Torres', telefono: '81-3333-4444', email: 'miguel@tecnihome.mx', especialidades: ['electrico', 'general'], zonas: ['San Nicolás de los Garza', 'Guadalupe', 'Apodaca'], activo: true, horarios: [
    { dia: 'Lunes', inicio: '08:00', fin: '19:00', disponible: true },
    { dia: 'Martes', inicio: '08:00', fin: '19:00', disponible: true },
    { dia: 'Miércoles', inicio: '08:00', fin: '19:00', disponible: true },
    { dia: 'Jueves', inicio: '08:00', fin: '19:00', disponible: true },
    { dia: 'Viernes', inicio: '08:00', fin: '19:00', disponible: true },
    { dia: 'Sábado', inicio: '09:00', fin: '15:00', disponible: true },
  ]},
  { nombre: 'Roberto Garza', telefono: '81-5555-6666', email: 'roberto@tecnihome.mx', especialidades: ['clima', 'electrico'], zonas: ['Santa Catarina', 'Monterrey Centro', 'San Pedro Garza García'], activo: true, horarios: [
    { dia: 'Lunes', inicio: '09:00', fin: '18:00', disponible: true },
    { dia: 'Martes', inicio: '09:00', fin: '18:00', disponible: true },
    { dia: 'Miércoles', inicio: '09:00', fin: '18:00', disponible: true },
    { dia: 'Jueves', inicio: '09:00', fin: '18:00', disponible: true },
    { dia: 'Viernes', inicio: '09:00', fin: '18:00', disponible: true },
    { dia: 'Sábado', inicio: '09:00', fin: '14:00', disponible: true },
  ]},
]

const SOLICITUDES = [
  { nombre_cliente: 'María González', telefono: '81-2345-6789', email: 'maria@gmail.com', servicio_nombre: 'Reparación de Climas', zona_nombre: 'San Pedro Garza García', fecha: '2026-03-24', hora: '9:00 AM', direccion: 'Av. Vasconcelos 123, Col. Del Valle', inmueble: 'Casa', descripcion: 'Clima no enfría, hace ruido extraño.', estado: 'pendiente' },
  { nombre_cliente: 'Roberto Treviño', telefono: '81-3456-7890', email: 'roberto.t@gmail.com', servicio_nombre: 'Mantenimiento Preventivo', zona_nombre: 'Cumbres', fecha: '2026-03-24', hora: '11:00 AM', direccion: 'Cumbres 5to Sector, Calle 15 #456', inmueble: 'Oficina', descripcion: 'Mantenimiento trimestral programado.', estado: 'confirmado', tecnico_nombre: 'Carlos Ramírez' },
  { nombre_cliente: 'Ana Laura Martínez', telefono: '81-4567-8901', email: 'analaura@gmail.com', servicio_nombre: 'Instalación de Climas', zona_nombre: 'Monterrey Centro', fecha: '2026-03-25', hora: '1:00 PM', direccion: 'Padre Mier #789, Col. Centro', inmueble: 'Departamento', descripcion: '2 minisplits 1.5 toneladas.', estado: 'en_proceso', tecnico_nombre: 'Roberto Garza' },
  { nombre_cliente: 'Carlos Mendoza', telefono: '81-5678-9012', email: 'cmendoza@hotmail.com', servicio_nombre: 'Servicios Eléctricos Residenciales', zona_nombre: 'San Nicolás de los Garza', fecha: '2026-03-23', hora: '4:00 PM', direccion: 'Col. Anáhuac, Calle 10 #234', inmueble: 'Casa', descripcion: 'Cortocircuito en cocina.', estado: 'completado', tecnico_nombre: 'Miguel Torres' },
  { nombre_cliente: 'Laura Villarreal', telefono: '81-6789-0123', email: 'laura.v@gmail.com', servicio_nombre: 'Diagnóstico Técnico', zona_nombre: 'Guadalupe', fecha: '2026-03-25', hora: '9:00 AM', direccion: 'Col. Linda Vista, Av. Aztlán #567', inmueble: 'Local Comercial', descripcion: 'Falla intermitente en aire central.', estado: 'pendiente' },
]

export async function seedDatabase() {
  const results = { servicios: 0, zonas: 0, tecnicos: 0, solicitudes: 0 }

  // Check if already seeded
  const existing = await getDocs(collection(db, 'servicios'))
  if (existing.size > 0) {
    return { message: 'Base de datos ya tiene datos. Seed cancelado.', ...results }
  }

  for (const s of SERVICIOS) {
    await addDoc(collection(db, 'servicios'), { ...s, created_at: serverTimestamp() })
    results.servicios++
  }

  for (const z of ZONAS) {
    await addDoc(collection(db, 'zonas'), { ...z, created_at: serverTimestamp() })
    results.zonas++
  }

  for (const t of TECNICOS) {
    await addDoc(collection(db, 'tecnicos'), { ...t, created_at: serverTimestamp() })
    results.tecnicos++
  }

  for (const s of SOLICITUDES) {
    await addDoc(collection(db, 'solicitudes'), { ...s, foto_url: null, tecnico_id: null, created_at: serverTimestamp(), updated_at: serverTimestamp() })
    results.solicitudes++
  }

  return { message: 'Seed completado', ...results }
}
