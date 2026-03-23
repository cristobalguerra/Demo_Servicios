import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Bot, ChevronRight } from 'lucide-react'
import { detectIntent } from '../data/chatbot'

const INITIAL = {
  from: 'bot',
  text: 'Hola, soy el asistente de TecniHome. Puedo ayudarte a encontrar el servicio que necesitas, validar tu zona o agendar una visita.',
  quickReplies: ['Ver servicios', 'Agendar', 'Validar zona', 'Precios', 'Urgencia', 'WhatsApp'],
}

function Md({ text }) {
  return text.split('\n').map((line, i) => (
    <span key={i}>
      {line.split(/\*\*(.*?)\*\*/g).map((part, j) =>
        j % 2 === 1 ? <strong key={j} className="text-text-heading">{part}</strong> : part
      )}
      {i < text.split('\n').length - 1 && <br />}
    </span>
  ))
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([INITIAL])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [unread, setUnread] = useState(0)
  const ref = useRef(null)
  const inputRef = useRef(null)
  const [flow, setFlow] = useState(null)
  const flowSteps = ['servicio', 'zona', 'fecha', 'hora', 'nombre', 'telefono', 'direccion']

  useEffect(() => { ref.current?.scrollTo(0, ref.current.scrollHeight) }, [messages, typing])
  useEffect(() => { if (isOpen) { setUnread(0); setTimeout(() => inputRef.current?.focus(), 100) } }, [isOpen])

  const addBot = (text, qr = []) => {
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages(p => [...p, { from: 'bot', text, quickReplies: qr }])
      if (!isOpen) setUnread(p => p + 1)
    }, 500 + Math.random() * 300)
  }

  const send = (text) => {
    const msg = text || input.trim()
    if (!msg) return
    setInput('')
    setMessages(p => [...p, { from: 'user', text: msg }])

    if (flow) { handleFlow(msg); return }

    const lower = msg.toLowerCase()
    if (['agendar', 'agendar servicio', 'agendar reparación', 'agendar instalación', 'agendar mantenimiento', 'agendar visita', 'agendar diagnóstico', 'agendar para después'].some(k => lower.includes(k))) {
      startFlow(); return
    }

    const quickMap = {
      'WhatsApp': { t: 'Escríbenos por WhatsApp al **81-9876-5432**.', qr: ['Ver servicios', 'Agendar'] },
      'Ver servicios': { t: 'Nuestros servicios:\n\n• **Climas / A/C** — Instalación, mantenimiento, reparación\n• **Eléctrico** — Residencial, contactos, tableros, lámparas\n• **General** — Diagnóstico, preventivo', qr: ['Climas / A/C', 'Eléctrico', 'Precios', 'Agendar'] },
      'Climas / A/C': { t: 'Servicios de climas:\n\n• Instalación — desde $2,500\n• Mantenimiento — desde $800\n• Reparación — desde $600', qr: ['Agendar', 'Ver precios'] },
      'Eléctrico': { t: 'Servicios eléctricos:\n\n• Residencial — desde $500\n• Contactos — desde $250\n• Tableros — desde $700\n• Lámparas — desde $350', qr: ['Agendar', 'Ver precios'] },
      'Llamar ahora': { t: 'Llámanos al **81-1234-5678**.', qr: ['Agendar', 'WhatsApp'] },
      'Emergencia 24/7': { t: '**Emergencias 24/7**\n\nTel: **81-1234-5678**\nWhatsApp: **81-9876-5432**', qr: ['Llamar ahora', 'WhatsApp'] },
      'Validar zona': { t: 'Zonas con cobertura:\n\n• San Pedro\n• Monterrey Centro\n• Cumbres\n• San Nicolás\n• Guadalupe\n• Apodaca\n• Santa Catarina\n\n¿En qué zona estás?', qr: ['San Pedro', 'Monterrey', 'Cumbres', 'San Nicolás'] },
      'Validar mi zona': { t: 'Escribe tu zona y te confirmo cobertura.', qr: ['San Pedro', 'Monterrey', 'Cumbres'] },
      'Ver zonas cubiertas': { t: 'Cobertura en San Pedro, Monterrey, Cumbres, San Nicolás, Guadalupe, Apodaca y Santa Catarina.', qr: ['Agendar', 'WhatsApp'] },
      'Ver precios': { t: 'Precios:\n\n• Instalación climas: $2,500\n• Mantenimiento A/C: $800\n• Reparación: $600\n• Eléctrico: $500\n• Contactos: $250\n• Tableros: $700\n• Lámparas: $350\n• Diagnóstico: $400\n• Preventivo: $1,200', qr: ['Agendar', 'Validar zona'] },
      'Precios': null,
      'Sí, contactarme': { t: 'Un ejecutivo te contactará. ¿Tu nombre y teléfono?', qr: ['Agendar', 'WhatsApp'] },
      'Más información': { t: 'Un ejecutivo te contactará pronto.', qr: ['Agendar', 'WhatsApp'] },
      'Volver al inicio': { t: INITIAL.text, qr: INITIAL.quickReplies },
      'Contactar por WhatsApp': { t: 'Escríbenos al **81-9876-5432**.', qr: ['Ver servicios', 'Agendar'] },
      'Urgencia': { t: '**Emergencias 24/7**\n\nTel: **81-1234-5678**\nWhatsApp: **81-9876-5432**\n\nTécnico en menos de 2 horas.', qr: ['Llamar ahora', 'WhatsApp'] },
    }

    if (msg === 'Precios') { send('Ver precios'); return }
    if (quickMap[msg]) { addBot(quickMap[msg].t, quickMap[msg].qr); return }
    const intent = detectIntent(msg)
    addBot(intent.response, intent.quickReplies || [])
  }

  const startFlow = () => {
    setFlow({ step: 0, data: {} })
    addBot('Vamos a agendar. **Paso 1/7:** ¿Qué servicio necesitas?', ['Instalación de clima', 'Mantenimiento A/C', 'Reparación de clima', 'Eléctrico residencial'])
  }

  const handleFlow = (msg) => {
    const s = flow.step, d = { ...flow.data }
    const prompts = {
      0: () => { d.servicio = msg; return { next: true, t: `**${msg}** ✓\n\n**Paso 2/7:** ¿En qué zona estás?`, qr: ['San Pedro', 'Monterrey', 'Cumbres', 'San Nicolás', 'Guadalupe', 'Apodaca', 'Santa Catarina'] } },
      1: () => {
        const ok = ['San Pedro', 'Monterrey', 'Cumbres', 'San Nicolás', 'Guadalupe', 'Apodaca', 'Santa Catarina'].some(z => msg.toLowerCase().includes(z.toLowerCase()))
        if (!ok) return { next: false, t: 'Sin cobertura. Selecciona:', qr: ['San Pedro', 'Monterrey', 'Cumbres', 'San Nicolás', 'Guadalupe', 'Apodaca', 'Santa Catarina'] }
        d.zona = msg; return { next: true, t: `**${msg}** ✓\n\n**Paso 3/7:** ¿Fecha?` }
      },
      2: () => { d.fecha = msg; return { next: true, t: `**${msg}** ✓\n\n**Paso 4/7:** ¿Horario?`, qr: ['9:00 AM', '11:00 AM', '1:00 PM', '4:00 PM', '6:00 PM'] } },
      3: () => { d.hora = msg; return { next: true, t: `**${msg}** ✓\n\n**Paso 5/7:** ¿Tu nombre?` } },
      4: () => { d.nombre = msg; return { next: true, t: `**${msg}** ✓\n\n**Paso 6/7:** ¿Teléfono?` } },
      5: () => { d.telefono = msg; return { next: true, t: `**${msg}** ✓\n\n**Paso 7/7:** ¿Dirección?` } },
      6: () => { d.direccion = msg; return { next: true, done: true, t: `Solicitud registrada:\n\n• **Servicio:** ${d.servicio}\n• **Zona:** ${d.zona}\n• **Fecha:** ${d.fecha} — ${d.hora}\n• **Nombre:** ${d.nombre}\n• **Tel:** ${d.telefono}\n• **Dirección:** ${msg}\n\nConfirmaremos por WhatsApp.`, qr: ['Volver al inicio', 'WhatsApp'] } },
    }
    const r = prompts[s]?.()
    if (r) {
      if (r.next) setFlow(r.done ? null : { step: s + 1, data: d })
      addBot(r.t, r.qr || [])
    }
  }

  return (
    <>
      {!isOpen && (
        <button onClick={() => setIsOpen(true)}
          className="fixed bottom-[4.5rem] lg:bottom-6 right-5 z-50 w-12 h-12 bg-brand hover:bg-brand-hover text-white rounded-full shadow-lg shadow-brand/20 flex items-center justify-center transition-all hover:scale-105">
          <MessageCircle className="w-5 h-5" />
          {unread > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent-red text-white text-[11px] font-bold rounded-full flex items-center justify-center">{unread}</span>
          )}
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-[4.5rem] lg:bottom-6 right-5 z-50 w-[360px] max-w-[calc(100vw-2.5rem)] bg-surface rounded-2xl shadow-2xl shadow-black/40 border border-border flex flex-col overflow-hidden"
          style={{ height: 'min(520px, calc(100vh - 140px))' }}>

          <div className="px-4 py-3 border-b border-border flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-text-heading">Asistente TecniHome</p>
                <p className="text-[10px] text-accent-green font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-green" style={{ animation: 'pulse-dot 2s infinite' }} /> En línea
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="w-7 h-7 hover:bg-surface-hover rounded flex items-center justify-center transition-colors">
              <X className="w-4 h-4 text-text-dim" />
            </button>
          </div>

          <div ref={ref} className="flex-1 overflow-y-auto p-3 space-y-3 chat-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className="max-w-[85%]">
                  {m.from === 'bot' ? (
                    <div className="bg-surface-2 border border-border-subtle rounded-xl rounded-bl-sm px-3.5 py-2.5">
                      <div className="text-[13px] text-text-muted leading-relaxed"><Md text={m.text} /></div>
                    </div>
                  ) : (
                    <div className="bg-brand text-white rounded-xl rounded-br-sm px-3.5 py-2.5">
                      <p className="text-[13px]">{m.text}</p>
                    </div>
                  )}
                  {m.from === 'bot' && m.quickReplies?.length > 0 && i === messages.length - 1 && (
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {m.quickReplies.map((qr, j) => (
                        <button key={j} onClick={() => send(qr)}
                          className="flex items-center gap-0.5 px-2.5 py-1 bg-surface border border-border text-text-dim text-[11px] font-medium rounded-md hover:border-border-hover hover:text-text-muted transition-colors">
                          <ChevronRight className="w-2.5 h-2.5 text-text-faint" />
                          {qr}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="bg-surface-2 border border-border-subtle rounded-xl rounded-bl-sm px-3.5 py-2.5">
                  <div className="flex gap-1">
                    {[0, 1, 2].map(i => (
                      <div key={i} className="w-1.5 h-1.5 bg-text-faint rounded-full animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-3 border-t border-border shrink-0">
            <div className="flex items-center gap-2 bg-surface-2 rounded-lg px-3 py-2 border border-border focus-within:border-brand/30 transition-colors">
              <input ref={inputRef} type="text" value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); send() } }}
                placeholder={flow ? `Paso ${flow.step + 1}/7...` : 'Escribe tu mensaje...'}
                className="flex-1 bg-transparent text-[13px] text-text-heading placeholder:text-text-faint focus:outline-none" />
              <button onClick={() => send()} disabled={!input.trim()}
                className="w-7 h-7 bg-brand disabled:bg-surface-3 text-white disabled:text-text-faint rounded flex items-center justify-center transition-colors">
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-[11px] text-text-faint text-center mt-1 font-mono">Respuestas predefinidas (demo)</p>
          </div>
        </div>
      )}
    </>
  )
}
