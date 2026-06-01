import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BookOpen, Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react'
import { useStore } from '../context/store'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const [email, setEmail] = useState('admin@bimbelsna.id')
  const [password, setPassword] = useState('admin123')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const login = useStore(s => s.login)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    await new Promise(r => setTimeout(r, 800)) // simulate async
    const ok = login(email, password)
    setLoading(false)
    if (ok) {
      toast.success('Selamat datang, Syauqi Nuzul Abdi!')
      navigate('/')
    } else {
      setError('Email atau password salah.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-100 dark:bg-primary-900/20 rounded-full blur-3xl opacity-60" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-100 dark:bg-purple-900/20 rounded-full blur-3xl opacity-60" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-sm relative"
      >
        <div className="card p-8 shadow-2xl shadow-slate-200/50 dark:shadow-slate-900/50">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-600 to-purple-600 flex items-center justify-center shadow-lg">
              <BookOpen size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">Bimbel SNA</h1>
              <p className="text-xs text-slate-400">Dashboard Admin</p>
            </div>
          </div>

          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-1">Masuk ke akun</h2>
          <p className="text-sm text-slate-400 mb-6">Kelola jadwal dan pembayaran bimbel</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Email</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="input-field pl-9"
                  placeholder="admin@bimbelsna.id"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="input-field pl-9 pr-10"
                  placeholder="••••••••"
                  required
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-xs text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 px-3 py-2 rounded-lg">
                ⚠️ {error}
              </motion.div>
            )}

            <button type="submit" disabled={loading}
              className="btn-primary w-full justify-center py-2.5 text-sm mt-2 disabled:opacity-60">
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  Masuk...
                </span>
              ) : (
                <><LogIn size={16} /> Masuk</>
              )}
            </button>
          </form>

          <div className="mt-6 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">Demo credentials:</p>
            <p className="text-xs font-mono text-slate-600 dark:text-slate-300">admin@bimbelsna.id</p>
            <p className="text-xs font-mono text-slate-600 dark:text-slate-300">admin123</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
