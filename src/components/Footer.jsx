import { Wrench } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 bg-brand rounded flex items-center justify-center">
                <Wrench className="w-2.5 h-2.5 text-white" />
              </div>
              <span className="text-sm font-semibold text-text-heading tracking-tight">TecniHome</span>
            </div>
            <p className="text-sm text-text-dim leading-relaxed">
              Servicios técnicos profesionales a domicilio en Monterrey y área metropolitana.
            </p>
          </div>

          <div>
            <p className="text-xs font-mono text-text-dim uppercase tracking-wider mb-3">Servicios</p>
            <ul className="space-y-1.5 text-xs text-text-dim">
              {['Instalación de Climas', 'Mantenimiento A/C', 'Reparación', 'Eléctrico', 'Diagnóstico'].map(s => (
                <li key={s}><a href="#servicios" className="hover:text-text-muted transition-colors">{s}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-mono text-text-dim uppercase tracking-wider mb-3">Empresa</p>
            <ul className="space-y-1.5 text-xs text-text-dim">
              {[
                { l: 'Cobertura', h: '#cobertura' },
                { l: 'Empresas', h: '#empresas' },
                { l: 'FAQ', h: '#faq' },
                { l: 'Contacto', h: '#contacto' },
              ].map(x => (
                <li key={x.l}><a href={x.h} className="hover:text-text-muted transition-colors">{x.l}</a></li>
              ))}
              <li><Link to="/admin" className="hover:text-text-muted transition-colors">Admin (Demo)</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-mono text-text-dim uppercase tracking-wider mb-3">Legal</p>
            <ul className="space-y-1.5 text-xs text-text-dim">
              <li><a href="#" className="hover:text-text-muted transition-colors">Aviso de Privacidad</a></li>
              <li><a href="#" className="hover:text-text-muted transition-colors">Términos y Condiciones</a></li>
              <li><a href="#" className="hover:text-text-muted transition-colors">Garantía</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-text-faint font-mono">
          <p>&copy; {new Date().getFullYear()} TecniHome. Todos los derechos reservados.</p>
          <p>Demo con fines demostrativos.</p>
        </div>
      </div>
    </footer>
  )
}
