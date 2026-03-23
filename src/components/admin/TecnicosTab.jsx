import { useState } from 'react'
import { useTecnicos, createTecnico, updateTecnico, deleteTecnico, useZonas } from '../../hooks/store'
import { Plus, X, Pencil, Trash2, User } from 'lucide-react'

const ESPECIALIDADES = ['clima', 'electrico', 'general']
const DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']

const emptyForm = { nombre: '', telefono: '', email: '', especialidades: [], zonas: [], horarios: DIAS.map(d => ({ dia: d, inicio: '08:00', fin: '19:00', disponible: true })) }

export default function TecnicosTab() {
  const { data: tecnicos, loading } = useTecnicos()
  const { data: zonas } = useZonas()
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState(null)
  const [form, setForm] = useState(emptyForm)

  const handleSave = async () => {
    if (!form.nombre.trim()) return
    const payload = { ...form }
    if (editId) {
      await updateTecnico(editId, payload)
    } else {
      await createTecnico(payload)
    }
    setForm(emptyForm)
    setShowForm(false)
    setEditId(null)
  }

  const handleEdit = (t) => {
    setForm({
      nombre: t.nombre,
      telefono: t.telefono || '',
      email: t.email || '',
      especialidades: t.especialidades || [],
      zonas: t.zonas || [],
      horarios: t.horarios || emptyForm.horarios,
    })
    setEditId(t.id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (confirm('¿Eliminar este técnico?')) await deleteTecnico(id)
  }

  const toggleArr = (arr, val) => arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val]

  if (loading) return <div className="py-12 text-center text-text-dim font-mono text-sm">Cargando...</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-text-heading">Técnicos</h3>
          <p className="text-xs text-text-dim">{tecnicos.length} registrados</p>
        </div>
        <button onClick={() => { setForm(emptyForm); setEditId(null); setShowForm(true) }}
          className="flex items-center gap-1.5 px-4 py-2 bg-brand hover:bg-brand-hover text-white text-sm font-medium rounded-lg transition-colors">
          <Plus className="w-4 h-4" /> Nuevo técnico
        </button>
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="bg-surface border border-border rounded-xl p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-semibold text-text-heading">{editId ? 'Editar' : 'Nuevo'} técnico</h4>
            <button onClick={() => setShowForm(false)} className="text-text-dim hover:text-text-muted"><X className="w-4 h-4" /></button>
          </div>
          <div className="grid sm:grid-cols-3 gap-3 mb-4">
            <input value={form.nombre} onChange={e => setForm(p => ({ ...p, nombre: e.target.value }))} placeholder="Nombre completo"
              className="px-3 py-2 bg-surface-2 border border-border rounded-lg text-sm text-text-heading placeholder:text-text-faint focus:outline-none focus:border-brand/30" />
            <input value={form.telefono} onChange={e => setForm(p => ({ ...p, telefono: e.target.value }))} placeholder="Teléfono"
              className="px-3 py-2 bg-surface-2 border border-border rounded-lg text-sm text-text-heading placeholder:text-text-faint focus:outline-none focus:border-brand/30" />
            <input value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="Email"
              className="px-3 py-2 bg-surface-2 border border-border rounded-lg text-sm text-text-heading placeholder:text-text-faint focus:outline-none focus:border-brand/30" />
          </div>

          {/* Especialidades */}
          <div className="mb-4">
            <p className="text-[11px] font-mono text-text-dim uppercase tracking-wider mb-2">Especialidades</p>
            <div className="flex gap-2">
              {ESPECIALIDADES.map(e => (
                <button key={e} onClick={() => setForm(p => ({ ...p, especialidades: toggleArr(p.especialidades, e) }))}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${
                    form.especialidades.includes(e) ? 'bg-brand border-brand text-white' : 'bg-surface-2 border-border text-text-dim'
                  }`}>
                  {e === 'clima' ? 'Climas' : e === 'electrico' ? 'Eléctrico' : 'General'}
                </button>
              ))}
            </div>
          </div>

          {/* Zonas */}
          <div className="mb-4">
            <p className="text-[11px] font-mono text-text-dim uppercase tracking-wider mb-2">Zonas</p>
            <div className="flex flex-wrap gap-1.5">
              {zonas.filter(z => z.cubierta).map(z => (
                <button key={z.id} onClick={() => setForm(p => ({ ...p, zonas: toggleArr(p.zonas, z.nombre) }))}
                  className={`px-2.5 py-1 text-[11px] font-medium rounded-md border transition-colors ${
                    form.zonas.includes(z.nombre) ? 'bg-brand border-brand text-white' : 'bg-surface-2 border-border text-text-dim'
                  }`}>
                  {z.nombre}
                </button>
              ))}
            </div>
          </div>

          {/* Horarios */}
          <div className="mb-4">
            <p className="text-[11px] font-mono text-text-dim uppercase tracking-wider mb-2">Horarios</p>
            <div className="space-y-1.5">
              {form.horarios.map((h, i) => (
                <div key={h.dia} className="flex items-center gap-3 text-sm">
                  <button onClick={() => {
                    const horarios = [...form.horarios]
                    horarios[i] = { ...h, disponible: !h.disponible }
                    setForm(p => ({ ...p, horarios }))
                  }} className={`w-20 text-left text-xs font-medium ${h.disponible ? 'text-text-heading' : 'text-text-faint line-through'}`}>
                    {h.dia}
                  </button>
                  <input type="time" value={h.inicio} disabled={!h.disponible}
                    onChange={e => { const hs = [...form.horarios]; hs[i] = { ...h, inicio: e.target.value }; setForm(p => ({ ...p, horarios: hs })) }}
                    className="px-2 py-1 bg-surface-2 border border-border rounded text-xs text-text-muted disabled:opacity-30 focus:outline-none" />
                  <span className="text-text-faint text-xs">a</span>
                  <input type="time" value={h.fin} disabled={!h.disponible}
                    onChange={e => { const hs = [...form.horarios]; hs[i] = { ...h, fin: e.target.value }; setForm(p => ({ ...p, horarios: hs })) }}
                    className="px-2 py-1 bg-surface-2 border border-border rounded text-xs text-text-muted disabled:opacity-30 focus:outline-none" />
                  <button onClick={() => {
                    const hs = [...form.horarios]; hs[i] = { ...h, disponible: !h.disponible }; setForm(p => ({ ...p, horarios: hs }))
                  }} className={`text-[10px] font-mono px-2 py-0.5 rounded border ${h.disponible ? 'bg-accent-green/10 text-accent-green border-accent-green/20' : 'bg-accent-red/10 text-accent-red border-accent-red/20'}`}>
                    {h.disponible ? 'Activo' : 'Libre'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button onClick={handleSave}
            className="px-5 py-2 bg-brand hover:bg-brand-hover text-white text-sm font-medium rounded-lg transition-colors">
            {editId ? 'Guardar cambios' : 'Crear técnico'}
          </button>
        </div>
      )}

      {/* List */}
      <div className="space-y-2">
        {tecnicos.map(t => (
          <div key={t.id} className="flex items-center justify-between p-4 bg-surface border border-border rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-surface-3 border border-border rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-text-dim" />
              </div>
              <div>
                <p className="text-sm font-medium text-text-heading">{t.nombre}</p>
                <div className="flex gap-1.5 mt-0.5">
                  {(t.especialidades || []).map(e => (
                    <span key={e} className="text-[10px] font-mono px-1.5 py-0.5 bg-brand/10 text-brand rounded border border-brand/20">{e}</span>
                  ))}
                </div>
                <p className="text-[11px] text-text-faint mt-0.5 font-mono">{t.telefono} · {(t.zonas || []).join(', ')}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${t.activo !== false ? 'bg-accent-green/10 text-accent-green border-accent-green/20' : 'bg-accent-red/10 text-accent-red border-accent-red/20'}`}>
                {t.activo !== false ? 'Activo' : 'Inactivo'}
              </span>
              <button onClick={() => handleEdit(t)} className="p-1.5 hover:bg-surface-hover rounded transition-colors">
                <Pencil className="w-3.5 h-3.5 text-text-dim" />
              </button>
              <button onClick={() => handleDelete(t.id)} className="p-1.5 hover:bg-surface-hover rounded transition-colors">
                <Trash2 className="w-3.5 h-3.5 text-accent-red" />
              </button>
            </div>
          </div>
        ))}
        {tecnicos.length === 0 && <p className="py-8 text-center text-sm text-text-faint font-mono">Sin técnicos registrados</p>}
      </div>
    </div>
  )
}
