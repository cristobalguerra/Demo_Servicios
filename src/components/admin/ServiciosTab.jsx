import { useState } from 'react'
import { useServicios, createServicio, updateServicio, deleteServicio } from '../../hooks/useFirestore'
import { Plus, X, Pencil, Trash2 } from 'lucide-react'

const CATS = [
  { id: 'clima', label: 'Climas' },
  { id: 'electrico', label: 'Eléctrico' },
  { id: 'general', label: 'General' },
]

const emptyForm = { nombre: '', descripcion: '', precio_base: '', duracion: '', categoria: 'clima', icono: 'Wrench', orden: 0 }

export default function ServiciosTab() {
  const { data: servicios, loading } = useServicios()
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState(null)
  const [form, setForm] = useState(emptyForm)

  const handleSave = async () => {
    if (!form.nombre.trim()) return
    const payload = { ...form, precio_base: Number(form.precio_base), orden: Number(form.orden) }
    if (editId) {
      await updateServicio(editId, payload)
    } else {
      await createServicio(payload)
    }
    setForm(emptyForm)
    setShowForm(false)
    setEditId(null)
  }

  const handleEdit = (s) => {
    setForm({ nombre: s.nombre, descripcion: s.descripcion || '', precio_base: s.precio_base || '', duracion: s.duracion || '', categoria: s.categoria || 'clima', icono: s.icono || 'Wrench', orden: s.orden || 0 })
    setEditId(s.id)
    setShowForm(true)
  }

  if (loading) return <div className="py-12 text-center text-text-dim font-mono text-sm">Cargando...</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-text-heading">Servicios</h3>
          <p className="text-xs text-text-dim">{servicios.length} servicios</p>
        </div>
        <button onClick={() => { setForm(emptyForm); setEditId(null); setShowForm(true) }}
          className="flex items-center gap-1.5 px-4 py-2 bg-brand hover:bg-brand-hover text-white text-sm font-medium rounded-lg transition-colors">
          <Plus className="w-4 h-4" /> Nuevo servicio
        </button>
      </div>

      {showForm && (
        <div className="bg-surface border border-border rounded-xl p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-semibold text-text-heading">{editId ? 'Editar' : 'Nuevo'} servicio</h4>
            <button onClick={() => setShowForm(false)} className="text-text-dim hover:text-text-muted"><X className="w-4 h-4" /></button>
          </div>
          <div className="grid sm:grid-cols-2 gap-3 mb-3">
            <input value={form.nombre} onChange={e => setForm(p => ({ ...p, nombre: e.target.value }))} placeholder="Nombre del servicio"
              className="px-3 py-2 bg-surface-2 border border-border rounded-lg text-sm text-text-heading placeholder:text-text-faint focus:outline-none focus:border-brand/30" />
            <div className="flex gap-2">
              <input type="number" value={form.precio_base} onChange={e => setForm(p => ({ ...p, precio_base: e.target.value }))} placeholder="Precio base"
                className="flex-1 px-3 py-2 bg-surface-2 border border-border rounded-lg text-sm text-text-heading placeholder:text-text-faint focus:outline-none focus:border-brand/30" />
              <input value={form.duracion} onChange={e => setForm(p => ({ ...p, duracion: e.target.value }))} placeholder="Duración (ej: 1-2 hrs)"
                className="flex-1 px-3 py-2 bg-surface-2 border border-border rounded-lg text-sm text-text-heading placeholder:text-text-faint focus:outline-none focus:border-brand/30" />
            </div>
          </div>
          <textarea value={form.descripcion} onChange={e => setForm(p => ({ ...p, descripcion: e.target.value }))} placeholder="Descripción" rows={2}
            className="w-full px-3 py-2 bg-surface-2 border border-border rounded-lg text-sm text-text-heading placeholder:text-text-faint focus:outline-none focus:border-brand/30 mb-3" />
          <div className="flex gap-2 mb-4">
            {CATS.map(c => (
              <button key={c.id} onClick={() => setForm(p => ({ ...p, categoria: c.id }))}
                className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${
                  form.categoria === c.id ? 'bg-brand border-brand text-white' : 'bg-surface-2 border-border text-text-dim'
                }`}>{c.label}</button>
            ))}
            <input type="number" value={form.orden} onChange={e => setForm(p => ({ ...p, orden: e.target.value }))} placeholder="Orden"
              className="w-20 px-2 py-1.5 bg-surface-2 border border-border rounded-md text-xs text-text-muted focus:outline-none" />
          </div>
          <button onClick={handleSave} className="px-5 py-2 bg-brand hover:bg-brand-hover text-white text-sm font-medium rounded-lg transition-colors">
            {editId ? 'Guardar' : 'Crear'}
          </button>
        </div>
      )}

      <div className="space-y-2">
        {servicios.map(s => (
          <div key={s.id} className="flex items-center justify-between p-4 bg-surface border border-border rounded-xl">
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-text-heading">{s.nombre}</p>
                <span className="text-[10px] font-mono px-1.5 py-0.5 bg-surface-3 border border-border rounded text-text-dim">{s.categoria}</span>
              </div>
              <p className="text-xs text-text-dim mt-0.5">{s.descripcion}</p>
              <p className="text-[11px] text-text-faint font-mono mt-0.5">${s.precio_base?.toLocaleString()} · {s.duracion}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => updateServicio(s.id, { activo: !s.activo })}
                className={`text-[10px] font-mono px-2 py-0.5 rounded border ${s.activo !== false ? 'bg-accent-green/10 text-accent-green border-accent-green/20' : 'bg-accent-red/10 text-accent-red border-accent-red/20'}`}>
                {s.activo !== false ? 'Activo' : 'Inactivo'}
              </button>
              <button onClick={() => handleEdit(s)} className="p-1.5 hover:bg-surface-hover rounded transition-colors">
                <Pencil className="w-3.5 h-3.5 text-text-dim" />
              </button>
              <button onClick={() => confirm('¿Eliminar?') && deleteServicio(s.id)} className="p-1.5 hover:bg-surface-hover rounded transition-colors">
                <Trash2 className="w-3.5 h-3.5 text-accent-red" />
              </button>
            </div>
          </div>
        ))}
        {servicios.length === 0 && <p className="py-8 text-center text-sm text-text-faint font-mono">Sin servicios. Agrega el primero.</p>}
      </div>
    </div>
  )
}
