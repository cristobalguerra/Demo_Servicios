// Store barrel — uses localStorage for demo mode (no Firebase required)
// To switch to Firebase, change imports to './useFirestore'
export {
  useSolicitudes, createSolicitud, updateSolicitud,
  useServicios, createServicio, updateServicio, deleteServicio,
  useTecnicos, createTecnico, updateTecnico, deleteTecnico,
  useZonas, createZona, updateZona,
  seedDemoData,
} from './useLocalStore'
