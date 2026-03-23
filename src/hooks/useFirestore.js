import { useState, useEffect } from 'react'
import { db } from '../lib/firebase'
import {
  collection, query, orderBy, onSnapshot, doc,
  addDoc, updateDoc, deleteDoc, serverTimestamp, where
} from 'firebase/firestore'

// Generic realtime collection hook
function useCollection(colName, orderField = 'created_at', filters = []) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    try {
      const constraints = [...filters, orderBy(orderField, 'desc')]
      const q = query(collection(db, colName), ...constraints)
      const unsub = onSnapshot(q, (snap) => {
        setData(snap.docs.map(d => ({ id: d.id, ...d.data() })))
        setLoading(false)
      }, (err) => {
        console.error(`Firestore error [${colName}]:`, err)
        setError(err)
        setLoading(false)
      })
      return unsub
    } catch (err) {
      setError(err)
      setLoading(false)
    }
  }, [colName, orderField, JSON.stringify(filters)])

  return { data, loading, error }
}

// --- SOLICITUDES ---
export function useSolicitudes(statusFilter) {
  const filters = statusFilter && statusFilter !== 'all'
    ? [where('estado', '==', statusFilter)]
    : []
  return useCollection('solicitudes', 'created_at', filters)
}

export async function createSolicitud(data) {
  return addDoc(collection(db, 'solicitudes'), {
    ...data,
    estado: 'pendiente',
    tecnico_id: null,
    tecnico_nombre: null,
    created_at: serverTimestamp(),
    updated_at: serverTimestamp(),
  })
}

export async function updateSolicitud(id, data) {
  return updateDoc(doc(db, 'solicitudes', id), {
    ...data,
    updated_at: serverTimestamp(),
  })
}

// --- SERVICIOS ---
export function useServicios() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const q = query(collection(db, 'servicios'), orderBy('orden', 'asc'))
    const unsub = onSnapshot(q, (snap) => {
      setData(snap.docs.map(d => ({ id: d.id, ...d.data() })))
      setLoading(false)
    }, () => setLoading(false))
    return unsub
  }, [])

  return { data, loading }
}

export async function createServicio(data) {
  return addDoc(collection(db, 'servicios'), {
    ...data,
    activo: true,
    created_at: serverTimestamp(),
  })
}

export async function updateServicio(id, data) {
  return updateDoc(doc(db, 'servicios', id), data)
}

export async function deleteServicio(id) {
  return deleteDoc(doc(db, 'servicios', id))
}

// --- ZONAS ---
export function useZonas() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const q = query(collection(db, 'zonas'), orderBy('orden', 'asc'))
    const unsub = onSnapshot(q, (snap) => {
      setData(snap.docs.map(d => ({ id: d.id, ...d.data() })))
      setLoading(false)
    }, () => setLoading(false))
    return unsub
  }, [])

  return { data, loading }
}

export async function createZona(data) {
  return addDoc(collection(db, 'zonas'), { ...data, created_at: serverTimestamp() })
}

export async function updateZona(id, data) {
  return updateDoc(doc(db, 'zonas', id), data)
}

// --- TECNICOS ---
export function useTecnicos() {
  return useCollection('tecnicos', 'created_at')
}

export async function createTecnico(data) {
  return addDoc(collection(db, 'tecnicos'), {
    ...data,
    activo: true,
    created_at: serverTimestamp(),
  })
}

export async function updateTecnico(id, data) {
  return updateDoc(doc(db, 'tecnicos', id), data)
}

export async function deleteTecnico(id) {
  return deleteDoc(doc(db, 'tecnicos', id))
}
