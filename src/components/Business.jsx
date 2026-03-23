import { ClipboardCheck, Building2, Headphones, ArrowRight } from 'lucide-react'

const features = [
  { icon: ClipboardCheck, title: 'Mantenimiento programado', desc: 'Planes mensuales, trimestrales o anuales.' },
  { icon: Building2, title: 'Pólizas de servicio', desc: 'Cobertura integral con tiempos garantizados.' },
  { icon: Headphones, title: 'Soporte a oficinas', desc: 'Atención prioritaria y reportes por visita.' },
]

export default function Business() {
  return (
    <section id="empresas" className="py-24 lg:py-32 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-xs font-mono text-brand uppercase tracking-[0.15em] mb-3">Empresas</p>
            <h2 className="text-[clamp(24px,4vw,48px)] font-extrabold tracking-tighter leading-[1.1] mb-4">
              Soluciones para{' '}
              <span className="text-gradient-brand">tu negocio</span>
            </h2>
            <p className="text-text-muted leading-relaxed">
              Planes especializados para empresas que necesitan mantenimiento continuo y atención prioritaria.
            </p>
            <a href="#contacto"
              className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 bg-brand hover:bg-brand-hover text-white text-sm font-medium rounded-lg transition-colors group">
              Solicitar información
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          <div className="space-y-3">
            {features.map((f, i) => (
              <div key={i} className="flex gap-4 p-4 bg-surface border border-border rounded-xl">
                <div className="w-10 h-10 shrink-0 bg-surface-3 border border-border rounded-lg flex items-center justify-center">
                  <f.icon className="w-5 h-5 text-text-muted" />
                </div>
                <div>
                  <h3 className="font-semibold text-[15px] text-text-heading tracking-tight">{f.title}</h3>
                  <p className="text-sm text-text-dim mt-1">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
