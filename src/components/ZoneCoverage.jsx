import { useState } from 'react'
import { MapPin, CheckCircle2, XCircle } from 'lucide-react'
import { zones } from '../data/services'

export default function ZoneCoverage() {
  const [selected, setSelected] = useState('')
  const zone = zones.find(z => z.id === selected)

  return (
    <section id="cobertura" className="py-24 lg:py-32 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="mb-14">
          <p className="text-xs font-mono text-brand uppercase tracking-[0.15em] mb-3">Cobertura</p>
          <h2 className="text-[clamp(24px,4vw,48px)] font-extrabold tracking-tighter leading-[1.1]">
            ¿Llegamos a tu zona?
          </h2>
          <p className="mt-3 text-text-dim">Selecciona tu municipio para verificar disponibilidad.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Map */}
          <div className="relative bg-surface border border-border rounded-xl p-8 min-h-[360px] overflow-hidden">
            <div className="absolute inset-0 opacity-[0.02]"
              style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            {[
              { name: 'San Pedro', x: '32%', y: '42%', ok: true },
              { name: 'Monterrey', x: '48%', y: '48%', ok: true },
              { name: 'Cumbres', x: '38%', y: '24%', ok: true },
              { name: 'San Nicolás', x: '58%', y: '30%', ok: true },
              { name: 'Guadalupe', x: '68%', y: '52%', ok: true },
              { name: 'Apodaca', x: '72%', y: '24%', ok: true },
              { name: 'Sta. Catarina', x: '18%', y: '56%', ok: true },
              { name: 'Escobedo', x: '52%', y: '14%', ok: false },
              { name: 'García', x: '8%', y: '38%', ok: false },
            ].map((d, i) => (
              <div key={i} className="absolute flex flex-col items-center" style={{ left: d.x, top: d.y }}>
                <div className={`w-2 h-2 rounded-full ${d.ok ? 'bg-brand' : 'bg-text-faint'} ${
                  zone?.name?.includes(d.name.split(' ')[0]) ? 'ring-4 ring-brand/30 scale-150' : ''
                } transition-all`} />
                <span className="text-[11px] font-mono text-text-dim mt-1 whitespace-nowrap">{d.name}</span>
              </div>
            ))}
            <div className="absolute bottom-4 left-4 flex gap-4 text-[11px] font-mono text-text-faint">
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-brand" /> Cobertura</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-text-faint" /> Próximamente</span>
            </div>
          </div>

          {/* Selector */}
          <div>
            <div className="space-y-1">
              {zones.map(z => (
                <button key={z.id} onClick={() => setSelected(z.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm text-left transition-all ${
                    selected === z.id
                      ? z.covered ? 'bg-brand/10 text-brand border border-brand/20' : 'bg-accent-red/10 text-accent-red border border-accent-red/20'
                      : 'text-text-muted hover:bg-surface border border-transparent hover:border-border'
                  }`}>
                  <span className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-text-faint" />
                    {z.name}
                  </span>
                  {selected === z.id && (
                    z.covered ? <CheckCircle2 className="w-4 h-4 text-accent-green" /> : <XCircle className="w-4 h-4 text-accent-red" />
                  )}
                </button>
              ))}
            </div>

            {zone && (
              <div className={`mt-4 p-4 rounded-lg border text-sm ${
                zone.covered ? 'bg-accent-green/5 border-accent-green/20 text-accent-green' : 'bg-accent-red/5 border-accent-red/20 text-accent-red'
              }`}>
                {zone.covered ? (
                  <>
                    <p className="font-medium flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> Sí tenemos cobertura en {zone.name}
                    </p>
                    <a href="#agendar" className="inline-block mt-2 text-xs font-medium text-brand hover:underline">Agendar servicio →</a>
                  </>
                ) : (
                  <p className="font-medium flex items-center gap-1.5">
                    <XCircle className="w-4 h-4" /> Zona fuera de cobertura
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
