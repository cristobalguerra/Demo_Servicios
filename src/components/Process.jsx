import { Search, CalendarDays, CheckCircle2, Wrench } from 'lucide-react'

const steps = [
  { icon: Search, num: '01', title: 'Selecciona', desc: 'Busca tu servicio o describe tu problema.' },
  { icon: CalendarDays, num: '02', title: 'Agenda', desc: 'Elige fecha, horario y confirma tu zona.' },
  { icon: CheckCircle2, num: '03', title: 'Confirmación', desc: 'Recibe datos de tu técnico por WhatsApp.' },
  { icon: Wrench, num: '04', title: 'Visita técnica', desc: 'El técnico resuelve. Pagas al terminar.' },
]

export default function Process() {
  return (
    <section id="proceso" className="py-24 lg:py-32 border-t border-border bg-surface-2/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="mb-14">
          <p className="text-xs font-mono text-brand uppercase tracking-[0.15em] mb-3">Proceso</p>
          <h2 className="text-[clamp(24px,4vw,48px)] font-extrabold tracking-tighter leading-[1.1]">
            Cuatro pasos simples
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((s, i) => (
            <div key={i}>
              <span className="text-[11px] font-mono text-text-faint">{s.num}</span>
              <div className="w-10 h-10 bg-surface border border-border rounded-lg flex items-center justify-center mt-2 mb-3">
                <s.icon className="w-5 h-5 text-text-muted" />
              </div>
              <h3 className="font-semibold text-text-heading text-[15px] tracking-tight mb-1.5">{s.title}</h3>
              <p className="text-sm text-text-dim leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
