import { useSyncExternalStore } from 'react'

// --- Reactive localStorage Store ---
let _store = null
const _listeners = new Set()

function emit() { _listeners.forEach(fn => fn()) }
function subscribe(fn) { _listeners.add(fn); return () => _listeners.delete(fn) }
function persist() { try { localStorage.setItem('tecnihome_demo', JSON.stringify(_store)) } catch {} }
const now = () => new Date().toISOString()
function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 8) }

function load() {
  if (_store) return
  try {
    const saved = localStorage.getItem('tecnihome_demo')
    if (saved) { _store = JSON.parse(saved); return }
  } catch {}
  seed()
}

function seed() {
  _store = {
    solicitudes: [
      { id: 'sol1', nombre_cliente: 'María González', telefono: '81-2345-6789', email: 'maria@gmail.com', servicio_nombre: 'Reparación de Climas', zona_nombre: 'San Pedro Garza García', fecha: '2026-03-24', hora: '9:00 AM', direccion: 'Av. Vasconcelos 123, Col. Del Valle', inmueble: 'Casa', descripcion: 'Clima no enfría, hace ruido extraño.', estado: 'pendiente', tecnico_id: null, tecnico_nombre: null, foto_url: null, created_at: now(), updated_at: now() },
      { id: 'sol2', nombre_cliente: 'Roberto Treviño', telefono: '81-3456-7890', email: 'roberto.t@gmail.com', servicio_nombre: 'Mantenimiento Preventivo', zona_nombre: 'Cumbres', fecha: '2026-03-24', hora: '11:00 AM', direccion: 'Cumbres 5to Sector, Calle 15 #456', inmueble: 'Oficina', descripcion: 'Mantenimiento trimestral programado.', estado: 'confirmado', tecnico_id: 't1', tecnico_nombre: 'Carlos Ramírez', foto_url: null, created_at: now(), updated_at: now() },
      { id: 'sol3', nombre_cliente: 'Ana Laura Martínez', telefono: '81-4567-8901', email: 'analaura@gmail.com', servicio_nombre: 'Instalación de Climas', zona_nombre: 'Monterrey Centro', fecha: '2026-03-25', hora: '1:00 PM', direccion: 'Padre Mier #789, Col. Centro', inmueble: 'Departamento', descripcion: '2 minisplits 1.5 toneladas.', estado: 'en_proceso', tecnico_id: 't3', tecnico_nombre: 'Roberto Garza', foto_url: null, created_at: now(), updated_at: now() },
      { id: 'sol4', nombre_cliente: 'Carlos Mendoza', telefono: '81-5678-9012', email: 'cmendoza@hotmail.com', servicio_nombre: 'Servicios Eléctricos Residenciales', zona_nombre: 'San Nicolás de los Garza', fecha: '2026-03-23', hora: '4:00 PM', direccion: 'Col. Anáhuac, Calle 10 #234', inmueble: 'Casa', descripcion: 'Cortocircuito en cocina.', estado: 'completado', tecnico_id: 't2', tecnico_nombre: 'Miguel Torres', foto_url: null, created_at: now(), updated_at: now() },
      { id: 'sol5', nombre_cliente: 'Laura Villarreal', telefono: '81-6789-0123', email: 'laura.v@gmail.com', servicio_nombre: 'Diagnóstico Técnico', zona_nombre: 'Guadalupe', fecha: '2026-03-25', hora: '9:00 AM', direccion: 'Col. Linda Vista, Av. Aztlán #567', inmueble: 'Local Comercial', descripcion: 'Falla intermitente en aire central.', estado: 'pendiente', tecnico_id: null, tecnico_nombre: null, foto_url: null, created_at: now(), updated_at: now() },
    ],
    servicios: [
      { id: 's1', nombre: 'Instalación de Climas', descripcion: 'Instalación profesional de minisplit, central o ventana con garantía.', precio_base: 2500, duracion: '2–4 hrs', categoria: 'clima', icono: 'Wind', orden: 1, activo: true, created_at: now() },
      { id: 's2', nombre: 'Mantenimiento de A/C', descripcion: 'Limpieza profunda, recarga de gas y revisión completa del sistema.', precio_base: 800, duracion: '1–2 hrs', categoria: 'clima', icono: 'Thermometer', orden: 2, activo: true, created_at: now() },
      { id: 's3', nombre: 'Reparación de Climas', descripcion: 'Diagnóstico y reparación de fallas en cualquier tipo de clima.', precio_base: 600, duracion: '1–3 hrs', categoria: 'clima', icono: 'Wrench', orden: 3, activo: true, created_at: now() },
      { id: 's4', nombre: 'Servicios Eléctricos Residenciales', descripcion: 'Instalación, reparación y mantenimiento eléctrico para tu hogar.', precio_base: 500, duracion: '1–2 hrs', categoria: 'electrico', icono: 'Zap', orden: 4, activo: true, created_at: now() },
      { id: 's5', nombre: 'Cambio de Contactos e Interruptores', descripcion: 'Sustitución segura de contactos, apagadores y accesorios eléctricos.', precio_base: 250, duracion: '30–60 min', categoria: 'electrico', icono: 'ToggleLeft', orden: 5, activo: true, created_at: now() },
      { id: 's6', nombre: 'Revisión de Tableros Eléctricos', descripcion: 'Inspección, balanceo de cargas y mantenimiento preventivo.', precio_base: 700, duracion: '1–2 hrs', categoria: 'electrico', icono: 'CircuitBoard', orden: 6, activo: true, created_at: now() },
      { id: 's7', nombre: 'Instalación de Lámparas y Ventiladores', descripcion: 'Montaje e instalación segura de luminarias y ventiladores de techo.', precio_base: 350, duracion: '1–2 hrs', categoria: 'electrico', icono: 'Lamp', orden: 7, activo: true, created_at: now() },
      { id: 's8', nombre: 'Diagnóstico Técnico', descripcion: 'Evaluación profesional para identificar fallas y proponer soluciones.', precio_base: 400, duracion: '1 hr', categoria: 'general', icono: 'Search', orden: 8, activo: true, created_at: now() },
      { id: 's9', nombre: 'Mantenimiento Preventivo', descripcion: 'Plan integral de revisión periódica para evitar fallas costosas.', precio_base: 1200, duracion: '2–3 hrs', categoria: 'general', icono: 'ShieldCheck', orden: 9, activo: true, created_at: now() },
    ],
    tecnicos: [
      { id: 't1', nombre: 'Carlos Ramírez', telefono: '81-1111-2222', email: 'carlos@tecnihome.mx', especialidades: ['clima', 'general'], zonas: ['San Pedro Garza García', 'Monterrey Centro', 'Cumbres'], activo: true, horarios: [
        { dia: 'Lunes', inicio: '08:00', fin: '19:00', disponible: true }, { dia: 'Martes', inicio: '08:00', fin: '19:00', disponible: true }, { dia: 'Miércoles', inicio: '08:00', fin: '19:00', disponible: true }, { dia: 'Jueves', inicio: '08:00', fin: '19:00', disponible: true }, { dia: 'Viernes', inicio: '08:00', fin: '19:00', disponible: true }, { dia: 'Sábado', inicio: '09:00', fin: '15:00', disponible: true },
      ], created_at: now() },
      { id: 't2', nombre: 'Miguel Torres', telefono: '81-3333-4444', email: 'miguel@tecnihome.mx', especialidades: ['electrico', 'general'], zonas: ['San Nicolás de los Garza', 'Guadalupe', 'Apodaca'], activo: true, horarios: [
        { dia: 'Lunes', inicio: '08:00', fin: '19:00', disponible: true }, { dia: 'Martes', inicio: '08:00', fin: '19:00', disponible: true }, { dia: 'Miércoles', inicio: '08:00', fin: '19:00', disponible: true }, { dia: 'Jueves', inicio: '08:00', fin: '19:00', disponible: true }, { dia: 'Viernes', inicio: '08:00', fin: '19:00', disponible: true }, { dia: 'Sábado', inicio: '09:00', fin: '15:00', disponible: true },
      ], created_at: now() },
      { id: 't3', nombre: 'Roberto Garza', telefono: '81-5555-6666', email: 'roberto@tecnihome.mx', especialidades: ['clima', 'electrico'], zonas: ['Santa Catarina', 'Monterrey Centro', 'San Pedro Garza García'], activo: true, horarios: [
        { dia: 'Lunes', inicio: '09:00', fin: '18:00', disponible: true }, { dia: 'Martes', inicio: '09:00', fin: '18:00', disponible: true }, { dia: 'Miércoles', inicio: '09:00', fin: '18:00', disponible: true }, { dia: 'Jueves', inicio: '09:00', fin: '18:00', disponible: true }, { dia: 'Viernes', inicio: '09:00', fin: '18:00', disponible: true }, { dia: 'Sábado', inicio: '09:00', fin: '14:00', disponible: true },
      ], created_at: now() },
    ],
    zonas: [
      { id: 'z1', nombre: 'San Pedro Garza García', cubierta: true, orden: 1, created_at: now() },
      { id: 'z2', nombre: 'Monterrey Centro', cubierta: true, orden: 2, created_at: now() },
      { id: 'z3', nombre: 'Cumbres', cubierta: true, orden: 3, created_at: now() },
      { id: 'z4', nombre: 'San Nicolás de los Garza', cubierta: true, orden: 4, created_at: now() },
      { id: 'z5', nombre: 'Guadalupe', cubierta: true, orden: 5, created_at: now() },
      { id: 'z6', nombre: 'Apodaca', cubierta: true, orden: 6, created_at: now() },
      { id: 'z7', nombre: 'Santa Catarina', cubierta: true, orden: 7, created_at: now() },
      { id: 'z8', nombre: 'General Escobedo', cubierta: false, orden: 8, created_at: now() },
      { id: 'z9', nombre: 'Juárez', cubierta: false, orden: 9, created_at: now() },
      { id: 'z10', nombre: 'García', cubierta: false, orden: 10, created_at: now() },
    ],
  }
  persist()
}

// --- CRUD ---
function addItem(col, data) {
  load()
  const item = { id: uid(), ...data, created_at: now(), updated_at: now() }
  _store = { ..._store, [col]: [item, ..._store[col]] }
  persist(); emit()
  return item
}

function updateItem(col, id, data) {
  load()
  _store = { ..._store, [col]: _store[col].map(i => i.id === id ? { ...i, ...data, updated_at: now() } : i) }
  persist(); emit()
}

function removeItem(col, id) {
  load()
  _store = { ..._store, [col]: _store[col].filter(i => i.id !== id) }
  persist(); emit()
}

// --- Solicitudes ---
export function useSolicitudes() {
  load()
  const data = useSyncExternalStore(subscribe, () => _store.solicitudes)
  return { data, loading: false }
}

export async function createSolicitud(data) {
  return addItem('solicitudes', { ...data, estado: 'pendiente', tecnico_id: null, tecnico_nombre: null })
}

export async function updateSolicitud(id, data) {
  updateItem('solicitudes', id, data)
}

// --- Servicios ---
export function useServicios() {
  load()
  const data = useSyncExternalStore(subscribe, () => _store.servicios)
  return { data, loading: false }
}

export async function createServicio(data) {
  return addItem('servicios', { ...data, activo: true })
}

export async function updateServicio(id, data) {
  updateItem('servicios', id, data)
}

export async function deleteServicio(id) {
  removeItem('servicios', id)
}

// --- Técnicos ---
export function useTecnicos() {
  load()
  const data = useSyncExternalStore(subscribe, () => _store.tecnicos)
  return { data, loading: false }
}

export async function createTecnico(data) {
  return addItem('tecnicos', { ...data, activo: true })
}

export async function updateTecnico(id, data) {
  updateItem('tecnicos', id, data)
}

export async function deleteTecnico(id) {
  removeItem('tecnicos', id)
}

// --- Zonas ---
export function useZonas() {
  load()
  const data = useSyncExternalStore(subscribe, () => _store.zonas)
  return { data, loading: false }
}

export async function createZona(data) {
  return addItem('zonas', data)
}

export async function updateZona(id, data) {
  updateItem('zonas', id, data)
}

// --- Seed / Reset ---
export function seedDemoData() {
  seed()
  emit()
  return { message: 'Datos demo cargados', servicios: _store.servicios.length, zonas: _store.zonas.length, tecnicos: _store.tecnicos.length, solicitudes: _store.solicitudes.length }
}
