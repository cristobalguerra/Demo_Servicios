import { useState, useEffect, useRef } from 'react'
import { ArrowRight, Search } from 'lucide-react'
import { services } from '../data/services'

const suggestions = [
  'Mi clima no enfría',
  'Necesito un electricista',
  'Instalar minisplit',
  'Mantenimiento preventivo',
  'Reparar aire acondicionado',
  'Falla eléctrica en casa',
  'Cambiar contactos',
  'Revisar tablero eléctrico',
]

export default function Hero() {
  const [query, setQuery] = useState('')
  const [placeholder, setPlaceholder] = useState('')
  const [suggIdx, setSuggIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const inputRef = useRef(null)

  // Typewriter effect for placeholder
  useEffect(() => {
    const current = suggestions[suggIdx]
    const timer = setTimeout(() => {
      if (!deleting) {
        if (charIdx < current.length) {
          setPlaceholder(current.slice(0, charIdx + 1))
          setCharIdx(c => c + 1)
        } else {
          setTimeout(() => setDeleting(true), 2000)
        }
      } else {
        if (charIdx > 0) {
          setPlaceholder(current.slice(0, charIdx - 1))
          setCharIdx(c => c - 1)
        } else {
          setDeleting(false)
          setSuggIdx(i => (i + 1) % suggestions.length)
        }
      }
    }, deleting ? 30 : 80)
    return () => clearTimeout(timer)
  }, [charIdx, deleting, suggIdx])

  // Display text for background wall
  const displayText = query || suggestions[suggIdx]

  // Match services
  const matched = query.length > 2
    ? services.filter(s =>
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.description.toLowerCase().includes(query.toLowerCase())
      )
    : []

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Text wall background */}
      <div className="absolute inset-0 flex flex-col items-center justify-center select-none pointer-events-none overflow-hidden opacity-[0.04]">
        {Array.from({ length: 12 }).map((_, row) => (
          <div key={row} className="flex gap-6 whitespace-nowrap">
            {Array.from({ length: 6 }).map((_, col) => (
              <span key={col}
                className="text-[clamp(32px,6vw,80px)] font-black uppercase tracking-tighter text-white leading-none py-1">
                {displayText}
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-base via-transparent to-base" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[120px]" />

      {/* Content */}
      <div className="relative z-10 max-w-[800px] mx-auto px-6 text-center">
        <div className="fade-up" style={{ animationDelay: '0.1s' }}>
          <p className="text-text-dim text-xs font-mono uppercase tracking-[0.2em] mb-6">
            Servicios técnicos a domicilio — Monterrey
          </p>
        </div>

        <div className="fade-up" style={{ animationDelay: '0.2s' }}>
          <h1 className="text-[clamp(28px,4vw+1rem,52px)] font-extrabold text-text-heading leading-[1.1] tracking-tighter mb-6">
            ¿Qué servicio{' '}
            <br className="hidden sm:block" />
            <span className="text-gradient-brand">necesitas?</span>
          </h1>
        </div>

        <div className="fade-up" style={{ animationDelay: '0.3s' }}>
          <p className="text-text-muted text-base lg:text-lg max-w-lg mx-auto mb-10 leading-relaxed">
            Escribe tu problema o el servicio que buscas. Técnicos certificados, respuesta rápida, cobertura en 7 zonas.
          </p>
        </div>

        {/* Search input */}
        <div className="fade-up relative max-w-xl mx-auto" style={{ animationDelay: '0.4s' }}>
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-dim group-focus-within:text-brand transition-colors" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={placeholder + '|'}
              className="w-full pl-12 pr-14 py-4 bg-surface border border-border rounded-xl text-base text-text-heading placeholder:text-text-faint focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/20 transition-all"
            />
            <a href="#agendar"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-brand hover:bg-brand-hover text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5">
              Agendar
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Results dropdown */}
          {matched.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-border rounded-xl overflow-hidden shadow-2xl shadow-black/30 z-20">
              {matched.map(s => (
                <a key={s.id} href="#agendar"
                  className="flex items-center justify-between px-4 py-3 hover:bg-surface-hover border-b border-border-subtle last:border-0 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-surface-3 border border-border rounded-lg flex items-center justify-center">
                      <s.icon className="w-4 h-4 text-text-muted" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-heading">{s.name}</p>
                      <p className="text-xs text-text-dim">{s.time} · Desde {s.price}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-text-dim" />
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Quick suggestions */}
        <div className="fade-up flex flex-wrap justify-center gap-2 mt-6" style={{ animationDelay: '0.5s' }}>
          {['Clima no enfría', 'Electricista', 'Instalar minisplit', 'Diagnóstico'].map(s => (
            <button key={s} onClick={() => { setQuery(s); inputRef.current?.focus() }}
              className="px-3 py-1.5 bg-surface-2 border border-border text-xs text-text-dim hover:text-text-muted hover:border-border-hover rounded-md transition-all">
              {s}
            </button>
          ))}
        </div>

        {/* Trust line */}
        <div className="fade-up mt-12 flex flex-wrap justify-center gap-6 text-text-dim" style={{ animationDelay: '0.6s' }}>
          {[
            'Respuesta en 2 hrs',
            'Técnicos verificados',
            '7 zonas de cobertura',
            'Cotización previa',
          ].map((t, i) => (
            <span key={i} className="flex items-center gap-2 text-xs">
              <span className="w-1 h-1 rounded-full bg-brand" />
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
