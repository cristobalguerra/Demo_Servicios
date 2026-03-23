import { useState } from 'react'
import { Wrench, Search, ArrowLeft, ChevronDown, Phone, MapPin, CalendarDays } from 'lucide-react'
import { Link } from 'react-router-dom'

const data = [
  { id: 1, nombre: 'María González', servicio: 'Reparación de Climas', zona: 'San Pedro', fecha: '2026-03-24', hora: '9:00 AM', tel: '81-2345-6789', estado: 'pendiente', desc: 'Clima no enfría.' },
  { id: 2, nombre: 'Roberto Treviño', servicio: 'Mantenimiento Preventivo', zona: 'Cumbres', fecha: '2026-03-24', hora: '11:00 AM', tel: '81-3456-7890', estado: 'confirmado', desc: 'Trimestral.' },
  { id: 3, nombre: 'Ana Laura Martínez', servicio: 'Instalación de Climas', zona: 'Monterrey', fecha: '2026-03-25', hora: '1:00 PM', tel: '81-4567-8901', estado: 'en_proceso', desc: '2 minisplits.' },
  { id: 4, nombre: 'Carlos Mendoza', servicio: 'Servicios Eléctricos', zona: 'San Nicolás', fecha: '2026-03-23', hora: '4:00 PM', tel: '81-5678-9012', estado: 'completado', desc: 'Cortocircuito.' },
  { id: 5, nombre: 'Laura Villarreal', servicio: 'Diagnóstico Técnico', zona: 'Guadalupe', fecha: '2026-03-25', hora: '9:00 AM', tel: '81-6789-0123', estado: 'pendiente', desc: 'Falla A/C.' },
  { id: 6, nombre: 'Jorge Garza', servicio: 'Contactos e Interruptores', zona: 'Apodaca', fecha: '2026-03-25', hora: '11:00 AM', tel: '81-7890-1234', estado: 'confirmado', desc: '5 contactos.' },
  { id: 7, nombre: 'Patricia López', servicio: 'Instalación de Lámparas', zona: 'Sta. Catarina', fecha: '2026-03-26', hora: '4:00 PM', tel: '81-8901-2345', estado: 'pendiente', desc: '3 lámparas.' },
]

const st = {
  pendiente: { label: 'Pendiente', cls: 'bg-accent-amber/10 text-accent-amber border-accent-amber/20' },
  confirmado: { label: 'Confirmado', cls: 'bg-brand/10 text-brand border-brand/20' },
  en_proceso: { label: 'En proceso', cls: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
  completado: { label: 'Completado', cls: 'bg-accent-green/10 text-accent-green border-accent-green/20' },
}

export default function AdminPage() {
  const [rows, setRows] = useState(data)
  const [q, setQ] = useState('')
  const [filter, setFilter] = useState('all')
  const [expanded, setExpanded] = useState(null)

  const filtered = rows.filter(r => {
    const m = r.nombre.toLowerCase().includes(q.toLowerCase()) || r.servicio.toLowerCase().includes(q.toLowerCase())
    return m && (filter === 'all' || r.estado === filter)
  })

  const counts = Object.fromEntries(['pendiente', 'confirmado', 'en_proceso', 'completado'].map(s => [s, rows.filter(r => r.estado === s).length]))

  return (
    <div className="min-h-screen bg-base">
      <header className="bg-surface border-b border-border sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-xs text-text-dim hover:text-text-muted flex items-center gap-1 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> Sitio
            </Link>
            <span className="text-border">|</span>
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 bg-brand rounded flex items-center justify-center">
                <Wrench className="w-2.5 h-2.5 text-white" />
              </div>
              <span className="text-sm font-semibold text-text-heading tracking-tight">Admin</span>
            </div>
          </div>
          <span className="px-2 py-0.5 bg-accent-amber/10 text-accent-amber text-[10px] font-mono font-semibold rounded border border-accent-amber/20">DEMO</span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 lg:px-10 py-6">
        <div className="grid grid-cols-4 gap-3 mb-6">
          {[
            { l: 'Pendientes', n: counts.pendiente, c: 'text-accent-amber' },
            { l: 'Confirmados', n: counts.confirmado, c: 'text-brand' },
            { l: 'En proceso', n: counts.en_proceso, c: 'text-purple-400' },
            { l: 'Completados', n: counts.completado, c: 'text-accent-green' },
          ].map((s, i) => (
            <div key={i} className="bg-surface border border-border rounded-lg p-3 text-center">
              <p className={`text-2xl font-bold ${s.c} font-mono`}>{s.n}</p>
              <p className="text-[10px] text-text-dim font-mono">{s.l}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-faint" />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Buscar..."
              className="w-full pl-9 pr-3 py-2 bg-surface border border-border rounded-lg text-sm text-text-heading placeholder:text-text-faint focus:outline-none focus:border-brand/30" />
          </div>
          <select value={filter} onChange={e => setFilter(e.target.value)}
            className="px-3 py-2 bg-surface border border-border rounded-lg text-sm text-text-muted focus:outline-none">
            <option value="all">Todos</option>
            <option value="pendiente">Pendientes</option>
            <option value="confirmado">Confirmados</option>
            <option value="en_proceso">En proceso</option>
            <option value="completado">Completados</option>
          </select>
        </div>

        <div className="bg-surface border border-border rounded-xl overflow-hidden">
          <table className="w-full hidden md:table">
            <thead>
              <tr className="border-b border-border text-[10px] font-mono text-text-faint uppercase tracking-wider">
                <th className="text-left px-4 py-2.5">Cliente</th>
                <th className="text-left px-4 py-2.5">Servicio</th>
                <th className="text-left px-4 py-2.5">Zona</th>
                <th className="text-left px-4 py-2.5">Fecha</th>
                <th className="text-left px-4 py-2.5">Estado</th>
                <th className="text-left px-4 py-2.5">Acción</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id} className="border-b border-border-subtle hover:bg-surface-hover transition-colors">
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-text-heading">{r.nombre}</p>
                    <p className="text-[11px] text-text-faint font-mono">{r.tel}</p>
                  </td>
                  <td className="px-4 py-3 text-sm text-text-muted">{r.servicio}</td>
                  <td className="px-4 py-3 text-sm text-text-dim">{r.zona}</td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-text-muted font-mono">{r.fecha}</p>
                    <p className="text-[11px] text-text-faint font-mono">{r.hora}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-0.5 ${st[r.estado].cls} text-[10px] font-mono font-medium rounded border`}>
                      {st[r.estado].label}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <select value={r.estado} onChange={e => setRows(p => p.map(x => x.id === r.id ? { ...x, estado: e.target.value } : x))}
                      className="text-[11px] px-2 py-1 bg-surface-2 border border-border rounded text-text-muted focus:outline-none">
                      <option value="pendiente">Pendiente</option>
                      <option value="confirmado">Confirmado</option>
                      <option value="en_proceso">En proceso</option>
                      <option value="completado">Completado</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="md:hidden divide-y divide-border-subtle">
            {filtered.map(r => (
              <div key={r.id} className="p-3">
                <button onClick={() => setExpanded(expanded === r.id ? null : r.id)} className="w-full flex items-center justify-between text-left">
                  <div>
                    <p className="text-sm font-medium text-text-heading">{r.nombre}</p>
                    <p className="text-[11px] text-text-dim">{r.servicio}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 ${st[r.estado].cls} text-[9px] font-mono rounded border`}>{st[r.estado].label}</span>
                    <ChevronDown className={`w-3.5 h-3.5 text-text-faint transition-transform ${expanded === r.id ? 'rotate-180' : ''}`} />
                  </div>
                </button>
                {expanded === r.id && (
                  <div className="mt-2 bg-surface-2 rounded-lg p-3 space-y-1 text-xs text-text-dim font-mono">
                    <p className="flex items-center gap-1.5"><Phone className="w-3 h-3" /> {r.tel}</p>
                    <p className="flex items-center gap-1.5"><MapPin className="w-3 h-3" /> {r.zona}</p>
                    <p className="flex items-center gap-1.5"><CalendarDays className="w-3 h-3" /> {r.fecha} — {r.hora}</p>
                    {r.desc && <p className="text-text-faint italic">"{r.desc}"</p>}
                    <select value={r.estado} onChange={e => setRows(p => p.map(x => x.id === r.id ? { ...x, estado: e.target.value } : x))}
                      className="w-full mt-1 px-2 py-1.5 bg-surface border border-border rounded text-xs text-text-muted">
                      <option value="pendiente">Pendiente</option>
                      <option value="confirmado">Confirmado</option>
                      <option value="en_proceso">En proceso</option>
                      <option value="completado">Completado</option>
                    </select>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-12 text-center text-sm text-text-faint font-mono">Sin resultados</div>
          )}
        </div>
      </main>
    </div>
  )
}
