import { useState, useEffect } from 'react'
import { Menu, X, Wrench } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [
    { label: 'Servicios', href: '#servicios' },
    { label: 'Cobertura', href: '#cobertura' },
    { label: 'Empresas', href: '#empresas' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contacto', href: '#contacto' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
      scrolled ? 'bg-base/80 backdrop-blur-xl border-b border-border' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-14">
          <a href="#" className="flex items-center gap-2">
            <div className="w-6 h-6 bg-brand rounded flex items-center justify-center">
              <Wrench className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm font-semibold text-text-heading tracking-tight">TecniHome</span>
          </a>

          <div className="hidden lg:flex items-center gap-1">
            {links.map(l => (
              <a key={l.href} href={l.href}
                className="link-underline px-3 py-1.5 text-[13px] text-text-muted hover:text-text-heading transition-colors">
                {l.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <a href="tel:8112345678" className="text-[13px] text-text-dim hover:text-text-muted transition-colors font-mono">
              81-1234-5678
            </a>
            <a href="#agendar"
              className="px-4 py-1.5 bg-brand hover:bg-brand-hover text-white text-[13px] font-medium rounded-md transition-colors">
              Agendar servicio
            </a>
          </div>

          <button onClick={() => setOpen(!open)} className="lg:hidden p-1.5 rounded hover:bg-surface transition-colors">
            {open ? <X className="w-5 h-5 text-text-muted" /> : <Menu className="w-5 h-5 text-text-muted" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-surface border-t border-border" role="dialog" aria-modal="true" aria-label="Menú de navegación"
          onKeyDown={e => e.key === 'Escape' && setOpen(false)}>
          <div className="px-6 py-3 space-y-0.5">
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                className="block px-3 py-3 text-[15px] text-text-muted hover:text-text-heading rounded transition-colors">
                {l.label}
              </a>
            ))}
            <div className="pt-3 mt-2 border-t border-border">
              <a href="#agendar" onClick={() => setOpen(false)}
                className="block text-center px-4 py-2.5 bg-brand text-white text-sm font-medium rounded-md">
                Agendar servicio
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
