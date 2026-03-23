import { useState } from 'react'
import { Upload, CheckCircle2, AlertCircle } from 'lucide-react'
import { services, zones, timeSlots, propertyTypes } from '../data/services'

const initial = {
  nombre: '', telefono: '', email: '', servicio: '', fecha: '',
  hora: '', direccion: '', zona: '', inmueble: '', descripcion: '', foto: null,
}

export default function BookingForm() {
  const [form, setForm] = useState(initial)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [fileName, setFileName] = useState('')

  const validate = () => {
    const e = {}
    if (!form.nombre.trim()) e.nombre = true
    if (!form.telefono.trim() || form.telefono.length < 10) e.telefono = true
    if (!form.email.trim() || !form.email.includes('@')) e.email = true
    if (!form.servicio) e.servicio = true
    if (!form.fecha) e.fecha = true
    if (!form.hora) e.hora = true
    if (!form.direccion.trim()) e.direccion = true
    if (!form.zona) e.zona = true
    if (!form.inmueble) e.inmueble = true
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) setSubmitted(true)
  }

  const set = (k, v) => {
    setForm(p => ({ ...p, [k]: v }))
    if (errors[k]) setErrors(p => ({ ...p, [k]: undefined }))
  }

  if (submitted) {
    return (
      <section id="agendar" className="py-24 lg:py-32 border-t border-border">
        <div className="max-w-md mx-auto px-6 text-center">
          <div className="w-12 h-12 mx-auto bg-accent-green/10 border border-accent-green/20 rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 className="w-6 h-6 text-accent-green" />
          </div>
          <h2 className="text-2xl font-bold text-text-heading mb-2">Solicitud enviada</h2>
          <p className="text-sm text-text-muted mb-4">Gracias, {form.nombre}. Confirmaremos por WhatsApp.</p>
          <div className="bg-surface border border-border rounded-lg p-4 text-left text-sm space-y-1.5 mb-6">
            <p><span className="text-text-dim">Servicio:</span> <span className="text-text-body">{services.find(s => s.id === form.servicio)?.name}</span></p>
            <p><span className="text-text-dim">Fecha:</span> <span className="text-text-body">{form.fecha} — {form.hora}</span></p>
            <p><span className="text-text-dim">Zona:</span> <span className="text-text-body">{zones.find(z => z.id === form.zona)?.name}</span></p>
          </div>
          <button onClick={() => { setSubmitted(false); setForm(initial) }}
            className="text-sm font-medium text-brand hover:text-brand-hover transition-colors">
            Agendar otro servicio
          </button>
        </div>
      </section>
    )
  }

  const cls = (k) => `w-full px-3 py-2.5 bg-surface border ${errors[k] ? 'border-accent-red/50' : 'border-border'} rounded-lg text-sm text-text-heading placeholder:text-text-faint focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/20 transition-colors`

  return (
    <section id="agendar" className="py-24 lg:py-32 border-t border-border">
      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        <div className="mb-10">
          <p className="text-xs font-mono text-brand uppercase tracking-[0.15em] mb-3">Agendar</p>
          <h2 className="text-[clamp(24px,4vw,40px)] font-extrabold tracking-tighter leading-[1.1]">
            Solicita tu visita técnica
          </h2>
          <p className="mt-2 text-text-dim text-sm">Completa el formulario. Confirmamos en minutos.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-surface border border-border rounded-xl p-6 lg:p-8">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-mono text-text-dim uppercase tracking-wider mb-1.5">Nombre *</label>
              <input type="text" value={form.nombre} onChange={e => set('nombre', e.target.value)}
                placeholder="Juan Pérez" className={cls('nombre')} />
              {errors.nombre && <p className="text-[11px] text-accent-red mt-1">Ingresa tu nombre completo.</p>}
            </div>
            <div>
              <label className="block text-[11px] font-mono text-text-dim uppercase tracking-wider mb-1.5">Teléfono *</label>
              <input type="tel" value={form.telefono} onChange={e => set('telefono', e.target.value.replace(/\D/g, '').slice(0, 10))}
                placeholder="81 1234 5678" className={cls('telefono')} />
              {errors.telefono && <p className="text-[11px] text-accent-red mt-1">Número de 10 dígitos requerido.</p>}
            </div>
            <div>
              <label className="block text-[11px] font-mono text-text-dim uppercase tracking-wider mb-1.5">Correo *</label>
              <input type="email" value={form.email} onChange={e => set('email', e.target.value)}
                placeholder="correo@ejemplo.com" className={cls('email')} />
              {errors.email && <p className="text-[11px] text-accent-red mt-1">Correo inválido.</p>}
            </div>
            <div>
              <label className="block text-[11px] font-mono text-text-dim uppercase tracking-wider mb-1.5">Servicio *</label>
              <select value={form.servicio} onChange={e => set('servicio', e.target.value)} className={cls('servicio')}>
                <option value="">Selecciona</option>
                {services.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
              {errors.servicio && <p className="text-[11px] text-accent-red mt-1">Selecciona un servicio.</p>}
            </div>
            <div>
              <label className="block text-[11px] font-mono text-text-dim uppercase tracking-wider mb-1.5">Fecha *</label>
              <input type="date" value={form.fecha} onChange={e => set('fecha', e.target.value)}
                min={new Date().toISOString().split('T')[0]} className={cls('fecha')} />
              {errors.fecha && <p className="text-[11px] text-accent-red mt-1">Selecciona una fecha.</p>}
            </div>
            <div>
              <label className="block text-[11px] font-mono text-text-dim uppercase tracking-wider mb-1.5">Horario *</label>
              <div className="flex flex-wrap gap-1.5">
                {timeSlots.map(slot => (
                  <button key={slot} type="button" onClick={() => set('hora', slot)}
                    className={`px-3 py-2 text-xs font-mono rounded-md border transition-colors ${
                      form.hora === slot
                        ? 'bg-brand border-brand text-white'
                        : `bg-surface ${errors.hora ? 'border-accent-red/30' : 'border-border'} text-text-dim hover:border-border-hover`
                    }`}>
                    {slot.replace(':00 ', ' ')}
                  </button>
                ))}
              </div>
              {errors.hora && <p className="text-[11px] text-accent-red mt-1">Selecciona un horario.</p>}
            </div>
            <div>
              <label className="block text-[11px] font-mono text-text-dim uppercase tracking-wider mb-1.5">Zona *</label>
              <select value={form.zona} onChange={e => set('zona', e.target.value)} className={cls('zona')}>
                <option value="">Selecciona zona</option>
                {zones.filter(z => z.covered).map(z => <option key={z.id} value={z.id}>{z.name}</option>)}
              </select>
              {errors.zona && <p className="text-[11px] text-accent-red mt-1">Selecciona tu zona.</p>}
            </div>
            <div>
              <label className="block text-[11px] font-mono text-text-dim uppercase tracking-wider mb-1.5">Inmueble *</label>
              <select value={form.inmueble} onChange={e => set('inmueble', e.target.value)} className={cls('inmueble')}>
                <option value="">Tipo</option>
                {propertyTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              {errors.inmueble && <p className="text-[11px] text-accent-red mt-1">Selecciona tipo de inmueble.</p>}
            </div>
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-mono text-text-dim uppercase tracking-wider mb-1.5">Dirección *</label>
              <input type="text" value={form.direccion} onChange={e => set('direccion', e.target.value)}
                placeholder="Calle, número, colonia" className={cls('direccion')} />
              {errors.direccion && <p className="text-[11px] text-accent-red mt-1">Ingresa tu dirección completa.</p>}
            </div>
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-mono text-text-dim uppercase tracking-wider mb-1.5">Descripción</label>
              <textarea value={form.descripcion} onChange={e => set('descripcion', e.target.value)}
                placeholder="Opcional" rows={3} className={cls('descripcion')} />
            </div>
            <div className="sm:col-span-2">
              <label className="flex items-center gap-2 px-3 py-2.5 bg-surface-2 border border-dashed border-border rounded-lg cursor-pointer hover:border-border-hover transition-colors text-sm text-text-dim">
                <Upload className="w-4 h-4" />
                {fileName || 'Subir foto (opcional)'}
                <input type="file" accept="image/*" onChange={e => {
                  if (e.target.files[0]) { setFileName(e.target.files[0].name); set('foto', e.target.files[0]) }
                }} className="hidden" />
              </label>
            </div>
          </div>

          {Object.keys(errors).length > 0 && (
            <p className="flex items-center gap-1.5 text-xs text-accent-red mt-4">
              <AlertCircle className="w-3.5 h-3.5" /> Completa todos los campos obligatorios.
            </p>
          )}

          <div className="mt-6 flex items-center gap-4">
            <button type="submit"
              className="px-6 py-2.5 bg-brand hover:bg-brand-hover text-white text-sm font-medium rounded-lg transition-colors">
              Confirmar solicitud
            </button>
            <span className="text-[11px] text-text-faint">Al enviar aceptas nuestros términos.</span>
          </div>
        </form>
      </div>
    </section>
  )
}
