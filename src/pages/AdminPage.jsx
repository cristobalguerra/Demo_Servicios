import { useState, useEffect } from 'react'
import { auth } from '../lib/firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { Wrench, ArrowLeft, LogOut, ClipboardList, Users, Settings, CalendarDays } from 'lucide-react'
import { Link } from 'react-router-dom'
import AdminLogin from '../components/admin/AdminLogin'
import { seedDatabase } from '../lib/seedData'
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
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('solicitudes')

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setLoading(false)
    })
    return unsub
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-base flex items-center justify-center">
        <p className="text-text-dim font-mono text-sm">Cargando...</p>
      </div>
    )
  }

  if (!user) return <AdminLogin />

  return (
    <div className="min-h-screen bg-base">
      {/* Header */}
      <header className="bg-surface border-b border-border sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-xs text-text-dim hover:text-text-muted flex items-center gap-1 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> Sitio
            </Link>
            <span className="text-border">|</span>
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 bg-brand rounded flex items-center justify-center">
                <Wrench className="w-2.5 h-2.5 text-white" />
              </div>
              <span className="text-sm font-semibold text-text-heading tracking-tight">Admin</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-text-faint font-mono hidden sm:inline">{user.email}</span>
            <button onClick={async () => {
              const r = await seedDatabase()
              alert(r.message + (r.servicios ? ` (${r.servicios} servicios, ${r.zonas} zonas, ${r.tecnicos} técnicos, ${r.solicitudes} solicitudes)` : ''))
            }} className="px-2.5 py-1 text-[11px] text-text-dim hover:text-brand border border-border rounded hover:border-brand/30 transition-colors font-mono">
              Seed DB
            </button>
            <button onClick={() => signOut(auth)}
              className="flex items-center gap-1 px-2.5 py-1 text-[11px] text-text-dim hover:text-accent-red border border-border rounded hover:border-accent-red/30 transition-colors">
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
              className={`flex items-center gap-1.5 px-4 py-3 text-[13px] font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === t.id
                  ? 'border-brand text-brand'
                  : 'border-transparent text-text-dim hover:text-text-muted'
              }`}>
              <t.icon className="w-3.5 h-3.5" />
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
