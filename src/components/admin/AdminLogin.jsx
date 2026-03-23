import { useState } from 'react'
import { auth } from '../../lib/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { Wrench, AlertCircle } from 'lucide-react'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, pass)
    } catch (err) {
      setError(err.code === 'auth/invalid-credential' ? 'Credenciales incorrectas' : 'Error al iniciar sesión')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-base flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center">
            <Wrench className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-semibold text-text-heading tracking-tight">TecniHome Admin</span>
        </div>

        <form onSubmit={handleLogin} className="bg-surface border border-border rounded-xl p-6">
          <h2 className="text-sm font-semibold text-text-heading mb-4">Iniciar sesión</h2>

          <div className="space-y-3">
            <div>
              <label className="block text-[11px] font-mono text-text-dim uppercase tracking-wider mb-1">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                className="w-full px-3 py-2.5 bg-surface-2 border border-border rounded-lg text-sm text-text-heading placeholder:text-text-faint focus:outline-none focus:border-brand/50" />
            </div>
            <div>
              <label className="block text-[11px] font-mono text-text-dim uppercase tracking-wider mb-1">Contraseña</label>
              <input type="password" value={pass} onChange={e => setPass(e.target.value)} required
                className="w-full px-3 py-2.5 bg-surface-2 border border-border rounded-lg text-sm text-text-heading placeholder:text-text-faint focus:outline-none focus:border-brand/50" />
            </div>
          </div>

          {error && (
            <p className="flex items-center gap-1.5 text-xs text-accent-red mt-3">
              <AlertCircle className="w-3.5 h-3.5" /> {error}
            </p>
          )}

          <button type="submit" disabled={loading}
            className="w-full mt-4 px-4 py-2.5 bg-brand hover:bg-brand-hover disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors">
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p className="text-center text-[11px] text-text-faint mt-4 font-mono">
          Crea un usuario en Firebase Auth → Authentication
        </p>
      </div>
    </div>
  )
}
