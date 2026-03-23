import { Phone, MessageCircle, Mail, Clock, AlertTriangle } from 'lucide-react'

export default function Contact() {
  return (
    <section id="contacto" className="py-24 lg:py-32 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="mb-14">
          <p className="text-xs font-mono text-brand uppercase tracking-[0.15em] mb-3">Contacto</p>
          <h2 className="text-[clamp(24px,4vw,48px)] font-extrabold tracking-tighter leading-[1.1]">
            ¿Necesitas ayuda?
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {[
            { icon: Phone, title: 'Teléfono', value: '81-1234-5678', href: 'tel:8112345678' },
            { icon: MessageCircle, title: 'WhatsApp', value: '81-9876-5432', href: 'https://wa.me/528198765432' },
            { icon: Mail, title: 'Correo', value: 'contacto@tecnihome.mx', href: 'mailto:contacto@tecnihome.mx' },
            { icon: Clock, title: 'Horario', value: 'L-V 8am–7pm', href: null },
          ].map((item, i) => {
            const W = item.href ? 'a' : 'div'
            return (
              <W key={i} {...(item.href ? { href: item.href, target: item.href?.startsWith('http') ? '_blank' : undefined } : {})}
                className="p-4 bg-surface border border-border rounded-xl hover:border-border-hover transition-colors group">
                <item.icon className="w-5 h-5 text-text-faint mb-3 group-hover:text-brand transition-colors" />
                <p className="text-[11px] font-mono text-text-faint uppercase tracking-wider">{item.title}</p>
                <p className="text-sm font-medium text-text-heading mt-0.5">{item.value}</p>
              </W>
            )
          })}
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-surface border border-accent-red/20 rounded-xl">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-accent-red shrink-0" />
            <div>
              <p className="text-sm font-medium text-text-heading">Emergencia eléctrica o de clima</p>
              <p className="text-xs text-text-dim">Atención 24/7 — técnico en menos de 2 horas.</p>
            </div>
          </div>
          <a href="tel:8112345678"
            className="px-5 py-2 bg-accent-red hover:bg-accent-red/90 text-white text-sm font-medium rounded-lg transition-colors shrink-0">
            Llamar ahora
          </a>
        </div>
      </div>
    </section>
  )
}
