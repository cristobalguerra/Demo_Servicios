import { useState } from 'react'
import { useSolicitudes, useTecnicos } from '../../hooks/store'
import { ChevronLeft, ChevronRight, User, Clock, MapPin } from 'lucide-react'

const HORAS = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM']

function formatDate(d) {
  return d.toISOString().split('T')[0]
}

export default function AgendaTab() {
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()))
  const [selectedTecnico, setSelectedTecnico] = useState('all')
  const { data: solicitudes } = useSolicitudes()
  const { data: tecnicos } = useTecnicos()

  const daySolicitudes = solicitudes.filter(s =>
    s.fecha === selectedDate &&
    s.estado !== 'cancelado' &&
    (selectedTecnico === 'all' || s.tecnico_id === selectedTecnico)
  )

  const prevDay = () => {
    const d = new Date(selectedDate)
    d.setDate(d.getDate() - 1)
    setSelectedDate(formatDate(d))
  }
  const nextDay = () => {
    const d = new Date(selectedDate)
    d.setDate(d.getDate() + 1)
    setSelectedDate(formatDate(d))
  }
  const today = () => setSelectedDate(formatDate(new Date()))

  const dayName = new Date(selectedDate + 'T12:00:00').toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long' })

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2">
          <button onClick={prevDay} className="p-1.5 hover:bg-surface-hover rounded transition-colors">
            <ChevronLeft className="w-4 h-4 text-text-muted" />
          </button>
          <div className="text-center min-w-[200px]">
            <p className="text-sm font-semibold text-text-heading capitalize">{dayName}</p>
            <p className="text-[11px] text-text-faint font-mono">{selectedDate}</p>
          </div>
          <button onClick={nextDay} className="p-1.5 hover:bg-surface-hover rounded transition-colors">
            <ChevronRight className="w-4 h-4 text-text-muted" />
          </button>
          <button onClick={today} className="ml-2 px-3 py-1 text-[11px] font-mono text-brand border border-brand/30 rounded hover:bg-brand/10 transition-colors">
            Hoy
          </button>
        </div>
        <select value={selectedTecnico} onChange={e => setSelectedTecnico(e.target.value)}
          className="px-3 py-2 bg-surface-2 border border-border rounded-lg text-sm text-text-muted focus:outline-none">
          <option value="all">Todos los técnicos</option>
          {tecnicos.filter(t => t.activo !== false).map(t => (
            <option key={t.id} value={t.id}>{t.nombre}</option>
          ))}
        </select>
      </div>

      {/* Timeline */}
      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        {HORAS.map(hora => {
          const citas = daySolicitudes.filter(s => s.hora === hora)
          return (
            <div key={hora} className="flex border-b border-border-subtle last:border-0">
              <div className="w-20 sm:w-24 shrink-0 py-3 px-3 border-r border-border-subtle">
                <span className="text-[11px] font-mono text-text-dim">{hora}</span>
              </div>
              <div className="flex-1 py-2 px-3 min-h-[52px]">
                {citas.length > 0 ? (
                  <div className="space-y-1.5">
                    {citas.map(c => (
                      <div key={c.id} className="flex items-center gap-3 px-3 py-2 bg-brand/10 border border-brand/20 rounded-lg">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-text-heading truncate">{c.nombre_cliente}</p>
                          <p className="text-[11px] text-text-dim truncate">{c.servicio_nombre}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          {c.tecnico_nombre && (
                            <span className="flex items-center gap-1 text-[10px] font-mono text-brand">
                              <User className="w-3 h-3" /> {c.tecnico_nombre}
                            </span>
                          )}
                          <span className="flex items-center gap-1 text-[10px] font-mono text-text-faint">
                            <MapPin className="w-3 h-3" /> {c.zona_nombre}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex items-center">
                    <span className="text-[11px] text-text-faint/40 font-mono">Disponible</span>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Summary */}
      <div className="mt-4 flex items-center gap-4 text-[11px] font-mono text-text-dim">
        <span>{daySolicitudes.length} cita{daySolicitudes.length !== 1 ? 's' : ''} para este día</span>
        <span>{daySolicitudes.filter(s => !s.tecnico_id).length} sin técnico asignado</span>
      </div>
    </div>
  )
}
