import { Star } from 'lucide-react'
import { testimonials } from '../data/services'

export default function Testimonials() {
  return (
    <section className="py-24 lg:py-32 border-t border-border bg-surface-2/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="mb-14">
          <p className="text-xs font-mono text-brand uppercase tracking-[0.15em] mb-3">Testimonios</p>
          <h2 className="text-[clamp(24px,4vw,48px)] font-extrabold tracking-tighter leading-[1.1]">
            Lo que dicen nuestros clientes
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {testimonials.map((t, i) => (
            <div key={i} className="p-6 bg-surface border border-border rounded-xl">
              <div className="flex gap-0.5 mb-3">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="w-3 h-3 text-accent-amber fill-accent-amber" />
                ))}
              </div>
              <p className="text-sm text-text-muted leading-relaxed mb-4">"{t.text}"</p>
              <div className="flex items-center gap-2.5 pt-3 border-t border-border-subtle">
                <div className="w-7 h-7 bg-surface-3 border border-border rounded-full flex items-center justify-center text-text-dim text-[9px] font-mono font-bold">
                  {t.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="text-sm font-medium text-text-heading">{t.name}</p>
                  <p className="text-xs text-text-faint">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
