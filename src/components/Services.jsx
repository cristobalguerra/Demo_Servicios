import { useState } from 'react'
import { Clock, ArrowRight } from 'lucide-react'
import { services } from '../data/services'

const filters = [
  { id: 'all', label: 'Todos' },
  { id: 'clima', label: 'Climas' },
  { id: 'electrico', label: 'Eléctrico' },
  { id: 'general', label: 'General' },
]

export default function Services() {
  const [filter, setFilter] = useState('all')
  const filtered = filter === 'all' ? services : services.filter(s => s.category === filter)

  return (
    <section id="servicios" className="py-24 lg:py-32 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <div>
            <p className="text-xs font-mono text-brand uppercase tracking-[0.15em] mb-3">Servicios</p>
            <h2 className="text-[clamp(24px,4vw,48px)] font-extrabold tracking-tighter leading-[1.1]">
              Todo lo que tu espacio necesita
            </h2>
          </div>
          <div className="flex gap-1">
            {filters.map(f => (
              <button key={f.id} onClick={() => setFilter(f.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  filter === f.id
                    ? 'bg-text-heading text-base'
                    : 'text-text-dim hover:text-text-muted'
                }`}>
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(s => (
            <a key={s.id} href="#agendar"
              className="group p-5 rounded-xl bg-surface border border-border hover:border-border-hover transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 bg-surface-3 border border-border rounded-lg flex items-center justify-center group-hover:border-border-hover transition-colors">
                  <s.icon className="w-5 h-5 text-text-muted" />
                </div>
                <span className="text-xs font-mono text-text-dim">
                  {s.price}
                </span>
              </div>
              <h3 className="font-semibold text-text-heading text-sm mb-1 tracking-tight">{s.name}</h3>
              <p className="text-xs text-text-dim leading-relaxed mb-4">{s.description}</p>
              <div className="flex items-center justify-between pt-3 border-t border-border-subtle">
                <span className="flex items-center gap-1.5 text-[11px] text-text-dim font-mono">
                  <Clock className="w-3 h-3" /> {s.time}
                </span>
                <span className="flex items-center gap-1 text-xs text-brand opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                  Solicitar <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
