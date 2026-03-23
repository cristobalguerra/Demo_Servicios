import { useState } from 'react'
import { Search, ChevronDown, Phone, MapPin, CalendarDays } from 'lucide-react'
import { useSolicitudes, updateSolicitud, useTecnicos } from '../../hooks/useFirestore'

const st = {
  pendiente: { label: 'Pendiente', cls: 'bg-accent-amber/10 text-accent-amber border-accent-amber/20' },
  confirmado: { label: 'Confirmado', cls: 'bg-brand/10 text-brand border-brand/20' },
  en_proceso: { label: 'En proceso', cls: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
  completado: { label: 'Completado', cls: 'bg-accent-green/10 text-accent-green border-accent-green/20' },
  cancelado: { label: 'Cancelado', cls: 'bg-accent-red/10 text-accent-red border-accent-red/20' },
}

export default function SolicitudesTab() {
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState(null)
  const { data: solicitudes, loading } = useSolicitudes()
  const { data: tecnicos } = useTecnicos()

  const filtered = solicitudes.filter(r => {
    const matchSearch = !search || r.nombre_cliente?.toLowerCase().includes(search.toLowerCase()) ||
      r.servicio_nombre?.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filter === 'all' || r.estado === filter
    return matchSearch && matchStatus
  })

  const counts = Object.fromEntries(
    ['pendiente', 'confirmado', 'en_proceso', 'completado'].map(s => [s, solicitudes.filter(r => r.estado === s).length])
  )

  if (loading) return <div className="py-12 text-center text-text-dim font-mono text-sm">Cargando solicitudes...</div>

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { l: 'Pendientes', n: counts.pendiente, c: 'text-accent-amber' },
          { l: 'Confirmados', n: counts.confirmado, c: 'text-brand' },
          { l: 'En proceso', n: counts.en_proceso, c: 'text-purple-400' },
          { l: 'Completados', n: counts.completado, c: 'text-accent-green' },
        ].map((s, i) => (
          <div key={i} className="bg-surface-2 border border-border rounded-lg p-3 text-center">
            <p className={`text-2xl font-bold ${s.c} font-mono`}>{s.n}</p>
            <p className="text-[11px] text-text-dim font-mono">{s.l}</p>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex gap-2 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-faint" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar cliente o servicio..."
            className="w-full pl-9 pr-3 py-2 bg-surface-2 border border-border rounded-lg text-sm text-text-heading placeholder:text-text-faint focus:outline-none focus:border-brand/30" />
        </div>
        <select value={filter} onChange={e => setFilter(e.target.value)}
          className="px-3 py-2 bg-surface-2 border border-border rounded-lg text-sm text-text-muted focus:outline-none">
          <option value="all">Todos</option>
          <option value="pendiente">Pendientes</option>
          <option value="confirmado">Confirmados</option>
          <option value="en_proceso">En proceso</option>
          <option value="completado">Completados</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <table className="w-full hidden lg:table">
          <thead>
            <tr className="border-b border-border text-[10px] font-mono text-text-faint uppercase tracking-wider">
              <th className="text-left px-4 py-2.5">Cliente</th>
              <th className="text-left px-4 py-2.5">Servicio</th>
              <th className="text-left px-4 py-2.5">Zona</th>
              <th className="text-left px-4 py-2.5">Fecha</th>
              <th className="text-left px-4 py-2.5">Técnico</th>
              <th className="text-left px-4 py-2.5">Estado</th>
              <th className="text-left px-4 py-2.5">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r.id} className="border-b border-border-subtle hover:bg-surface-hover transition-colors">
                <td className="px-4 py-3">
                  <p className="text-sm font-medium text-text-heading">{r.nombre_cliente}</p>
                  <p className="text-[11px] text-text-faint font-mono">{r.telefono}</p>
                </td>
                <td className="px-4 py-3 text-sm text-text-muted">{r.servicio_nombre}</td>
                <td className="px-4 py-3 text-sm text-text-dim">{r.zona_nombre}</td>
                <td className="px-4 py-3">
                  <p className="text-sm text-text-muted font-mono">{r.fecha}</p>
                  <p className="text-[11px] text-text-faint font-mono">{r.hora}</p>
                </td>
                <td className="px-4 py-3">
                  <select value={r.tecnico_id || ''} onChange={e => {
                    const t = tecnicos.find(t => t.id === e.target.value)
                    updateSolicitud(r.id, { tecnico_id: e.target.value || null, tecnico_nombre: t?.nombre || null })
                  }} className="text-[11px] px-2 py-1 bg-surface-2 border border-border rounded text-text-muted focus:outline-none w-full max-w-[140px]">
                    <option value="">Sin asignar</option>
                    {tecnicos.filter(t => t.activo).map(t => <option key={t.id} value={t.id}>{t.nombre}</option>)}
                  </select>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-block px-2 py-0.5 ${(st[r.estado] || st.pendiente).cls} text-[10px] font-mono font-medium rounded border`}>
                    {(st[r.estado] || st.pendiente).label}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <select value={r.estado} onChange={e => updateSolicitud(r.id, { estado: e.target.value })}
                    className="text-[11px] px-2 py-1 bg-surface-2 border border-border rounded text-text-muted focus:outline-none">
                    <option value="pendiente">Pendiente</option>
                    <option value="confirmado">Confirmado</option>
                    <option value="en_proceso">En proceso</option>
                    <option value="completado">Completado</option>
                    <option value="cancelado">Cancelado</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile */}
        <div className="lg:hidden divide-y divide-border-subtle">
          {filtered.map(r => (
            <div key={r.id} className="p-3">
              <button onClick={() => setExpanded(expanded === r.id ? null : r.id)} className="w-full flex items-center justify-between text-left">
                <div>
                  <p className="text-sm font-medium text-text-heading">{r.nombre_cliente}</p>
                  <p className="text-[11px] text-text-dim">{r.servicio_nombre}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 ${(st[r.estado] || st.pendiente).cls} text-[9px] font-mono rounded border`}>
                    {(st[r.estado] || st.pendiente).label}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-text-faint transition-transform ${expanded === r.id ? 'rotate-180' : ''}`} />
                </div>
              </button>
              {expanded === r.id && (
                <div className="mt-2 bg-surface-2 rounded-lg p-3 space-y-2 text-xs text-text-dim font-mono">
                  <p className="flex items-center gap-1.5"><Phone className="w-3 h-3" /> {r.telefono}</p>
                  <p className="flex items-center gap-1.5"><MapPin className="w-3 h-3" /> {r.zona_nombre}</p>
                  <p className="flex items-center gap-1.5"><CalendarDays className="w-3 h-3" /> {r.fecha} — {r.hora}</p>
                  {r.descripcion && <p className="text-text-faint italic">"{r.descripcion}"</p>}
                  <div className="flex gap-2 mt-2">
                    <select value={r.estado} onChange={e => updateSolicitud(r.id, { estado: e.target.value })}
                      className="flex-1 px-2 py-1.5 bg-surface border border-border rounded text-xs text-text-muted">
                      <option value="pendiente">Pendiente</option>
                      <option value="confirmado">Confirmado</option>
                      <option value="en_proceso">En proceso</option>
                      <option value="completado">Completado</option>
                      <option value="cancelado">Cancelado</option>
                    </select>
                    <select value={r.tecnico_id || ''} onChange={e => {
                      const t = tecnicos.find(t => t.id === e.target.value)
                      updateSolicitud(r.id, { tecnico_id: e.target.value || null, tecnico_nombre: t?.nombre || null })
                    }} className="flex-1 px-2 py-1.5 bg-surface border border-border rounded text-xs text-text-muted">
                      <option value="">Técnico...</option>
                      {tecnicos.filter(t => t.activo).map(t => <option key={t.id} value={t.id}>{t.nombre}</option>)}
                    </select>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-text-faint font-mono">
            {loading ? 'Cargando...' : 'Sin solicitudes'}
          </div>
        )}
      </div>
    </div>
  )
}
