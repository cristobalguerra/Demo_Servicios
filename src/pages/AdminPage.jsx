import { useState } from 'react'
import { Wrench, ArrowLeft, LogOut, ClipboardList, Users, Settings, CalendarDays, Database } from 'lucide-react'
import { Link } from 'react-router-dom'
import { seedDemoData } from '../hooks/store'
import SolicitudesTab from '../components/admin/SolicitudesTab'
import TecnicosTab from '../components/admin/TecnicosTab'
import ServiciosTab from '../components/admin/ServiciosTab'
import AgendaTab from '../components/admin/AgendaTab'

const tabs = [
  { id: 'solicitudes', label: 'Solicitudes', icon: ClipboardList },
  { id: 'tecnicos', label: 'Técnicos', icon: Users },
  { id: 'servicios', label: 'Servicios', icon: Settings },
  { id: 'agenda', label: 'Agenda', icon: CalendarDays },
]

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(() => localStorage.getItem('admin_demo') === '1')
  const [activeTab, setActiveTab] = useState('solicitudes')

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-base flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="flex items-center justify-center gap-2.5 mb-8">
            <div className="w-9 h-9 bg-brand rounded-lg flex items-center justify-center">
              <Wrench className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="text-lg font-bold text-text-heading tracking-tight">TecniHome Admin</span>
          </div>

          <div className="bg-surface border border-border rounded-xl p-6">
            <h2 className="text-base font-semibold text-text-heading mb-2">Panel de administración</h2>
            <p className="text-sm text-text-dim mb-6">Gestiona solicitudes, técnicos, servicios y agenda.</p>

            <button onClick={() => { localStorage.setItem('admin_demo', '1'); setLoggedIn(true) }}
              className="w-full px-4 py-3 bg-brand hover:bg-brand-hover text-white text-sm font-semibold rounded-lg transition-colors">
              Entrar al panel
            </button>

            <p className="text-xs text-text-faint mt-4 text-center">
              Datos almacenados localmente (localStorage). No requiere configuración.
            </p>
          </div>

          <Link to="/" className="block text-center text-sm text-text-dim hover:text-text-muted mt-4 transition-colors">
            ← Volver al sitio
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-base">
      {/* Header */}
      <header className="bg-surface border-b border-border sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-xs text-text-dim hover:text-text-muted flex items-center gap-1 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> Sitio
            </Link>
            <span className="text-border">|</span>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-brand rounded flex items-center justify-center">
                <Wrench className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm font-bold text-text-heading tracking-tight">Admin</span>
              <span className="px-1.5 py-0.5 bg-accent-amber/15 text-accent-amber text-[10px] font-mono font-bold rounded border border-accent-amber/20">DEMO</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => {
              const r = seedDemoData()
              alert(r.message + ` (${r.servicios} servicios, ${r.zonas} zonas, ${r.tecnicos} técnicos, ${r.solicitudes} solicitudes)`)
            }}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-text-dim hover:text-brand border border-border rounded-md hover:border-brand/30 transition-colors font-medium">
              <Database className="w-3 h-3" /> Reset datos
            </button>
            <button onClick={() => { localStorage.removeItem('admin_demo'); setLoggedIn(false) }}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-text-dim hover:text-accent-red border border-border rounded-md hover:border-accent-red/30 transition-colors font-medium">
              <LogOut className="w-3 h-3" /> Salir
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex gap-0.5 overflow-x-auto">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === t.id
                  ? 'border-brand text-brand'
                  : 'border-transparent text-text-dim hover:text-text-muted'
              }`}>
              <t.icon className="w-4 h-4" />
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-6">
        {activeTab === 'solicitudes' && <SolicitudesTab />}
        {activeTab === 'tecnicos' && <TecnicosTab />}
        {activeTab === 'servicios' && <ServiciosTab />}
        {activeTab === 'agenda' && <AgendaTab />}
      </main>
    </div>
  )
}
