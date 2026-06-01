import { useState } from 'react'
import { motion } from 'framer-motion'
import { Moon, Sun, User, Bell, Shield, Info } from 'lucide-react'
import { useStore } from '../context/store'
import toast from 'react-hot-toast'

export default function PengaturanPage() {
  const { darkMode, toggleDark, user } = useStore()
  const [profile, setProfile] = useState({ name: user?.name || 'SNA Admin', email: user?.email || 'admin@bimbelsna.id', bimbel: 'Jadwal Bimbel SNA' })

  const handleSave = () => toast.success('Pengaturan disimpan!')

  return (
    <div className="space-y-5 max-w-2xl">
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white"> Pengaturan</h1>
        <p className="text-sm text-slate-400">Kelola akun dan preferensi tampilan</p>
      </div>

      {/* Profile */}
      <motion.div initial={{ opacity:0,y:16 }} animate={{ opacity:1,y:0 }} className="card p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-lg bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center">
            <User size={16} className="text-primary-600" />
          </div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-100">Profil Admin</h2>
        </div>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            {profile.name.slice(0,2).toUpperCase()}
          </div>
          <div>
            <div className="font-bold text-slate-800 dark:text-slate-100">{profile.name}</div>
            <div className="text-sm text-slate-400">{profile.email}</div>
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-medium">Admin</span>
          </div>
        </div>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Nama Admin</label>
            <input className="input-field" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Email</label>
            <input className="input-field" type="email" value={profile.email} onChange={e => setProfile({...profile, email: e.target.value})} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Nama Bimbel</label>
            <input className="input-field" value={profile.bimbel} onChange={e => setProfile({...profile, bimbel: e.target.value})} />
          </div>
          <button onClick={handleSave} className="btn-primary text-sm py-2">Simpan Perubahan</button>
        </div>
      </motion.div>

      {/* Appearance */}
      <motion.div initial={{ opacity:0,y:16 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.1 }} className="card p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center">
            {darkMode ? <Moon size={16} className="text-purple-600" /> : <Sun size={16} className="text-amber-500" />}
          </div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-100">Tampilan</h2>
        </div>
        <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
          <div>
            <div className="font-medium text-sm text-slate-800 dark:text-slate-200">Mode Gelap</div>
            <div className="text-xs text-slate-400">Tampilan lebih nyaman di malam hari</div>
          </div>
          <button onClick={toggleDark}
            className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${darkMode ? 'bg-primary-600' : 'bg-slate-300'}`}>
            <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${darkMode ? 'left-7' : 'left-1'}`} />
          </button>
        </div>
      </motion.div>

      {/* Info */}
      <motion.div initial={{ opacity:0,y:16 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.2 }} className="card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-700 flex items-center justify-center">
            <Info size={16} className="text-slate-500" />
          </div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-100">Informasi Aplikasi</h2>
        </div>
        <div className="space-y-2 text-sm">
          {[
            ['Nama Aplikasi', 'Jadwal Bimbel SNA'],
            ['Versi',         '1.0.0'],
            ['Tech Stack',    'React + Vite + Tailwind CSS'],
            ['State Manager', 'Zustand (persisted)'],
            ['Data disimpan', 'localStorage browser'],
          ].map(([label, val]) => (
            <div key={label} className="flex justify-between py-2 border-b border-slate-50 dark:border-slate-700 last:border-0">
              <span className="text-slate-500 dark:text-slate-400">{label}</span>
              <span className="text-slate-700 dark:text-slate-200 font-medium">{val}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
