import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  { q: '¿Cuáles son los horarios de atención?', a: 'Lunes a viernes 8:00 AM – 7:00 PM, sábados 9:00 AM – 3:00 PM. Emergencias 24/7.' },
  { q: '¿Cuánto cuesta un servicio?', a: 'Diagnóstico desde $400 MXN. Siempre recibes cotización antes de iniciar.' },
  { q: '¿Cuánto tardan en llegar?', a: 'Programados: 24-48 hrs. Emergencias: menos de 2 horas.' },
  { q: '¿Qué zonas cubren?', a: 'San Pedro, Monterrey Centro, Cumbres, San Nicolás, Guadalupe, Apodaca, Santa Catarina.' },
  { q: '¿Formas de pago?', a: 'Efectivo, tarjeta débito/crédito, transferencia y CoDi.' },
  { q: '¿Los técnicos están certificados?', a: 'Sí. Verificación de antecedentes, certificación técnica, ID oficial.' },
  { q: '¿Ofrecen garantía?', a: '30 días mano de obra, 6 meses en instalaciones nuevas.' },
  { q: '¿Pueden facturar?', a: 'Sí, emitimos CFDI. Solicítala al agendar.' },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)

  return (
    <section id="faq" className="py-24 lg:py-32 border-t border-border">
      <div className="max-w-2xl mx-auto px-6 lg:px-10">
        <div className="mb-10">
          <p className="text-xs font-mono text-brand uppercase tracking-[0.15em] mb-3">FAQ</p>
          <h2 className="text-[clamp(24px,4vw,40px)] font-extrabold tracking-tighter leading-[1.1]">
            Preguntas frecuentes
          </h2>
        </div>

        <div className="space-y-1">
          {faqs.map((f, i) => (
            <div key={i} className="border-b border-border">
              <button onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                className="w-full flex items-center justify-between py-4 text-left group">
                <span className="text-sm font-medium text-text-heading pr-4 group-hover:text-brand transition-colors">{f.q}</span>
                <ChevronDown className={`w-4 h-4 text-text-dim shrink-0 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-out ${open === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="pb-4 text-sm text-text-dim leading-relaxed">{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
