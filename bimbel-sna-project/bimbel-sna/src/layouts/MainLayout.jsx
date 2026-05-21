import { useState } from 'react'
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Calendar, Wallet, CheckSquare, BarChart3,
  Settings, LogOut, Menu, X, Bell, Search, BookOpen, ChevronRight
} from 'lucide-react'
import { useStore } from '../context/store'
import { cls } from '../utils/helpers'
import toast from 'react-hot-toast'

const NAV_ITEMS = [
  { to: '/',            icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/jadwal',      icon: Calendar,        label: 'Jadwal' },
  { to: '/pembayaran',  icon: Wallet,          label: 'Pembayaran' },
  { to: '/todo',        icon: CheckSquare,     label: 'To-Do List' },
  { to: '/statistik',   icon: BarChart3,       label: 'Statistik' },
  { to: '/pengaturan',  icon: Settings,        label: 'Pengaturan' },
]

export default function MainLayout() {
  const { logout, user, todos, payments, sidebarOpen, toggleSidebar } = useStore()
  const navigate = useNavigate()
  const location = useLocation()
  const [showNotif, setShowNotif] = useState(false)
  const [searchQ, setSearchQ] = useState('')

  const undone = todos.filter(t => !t.done).length
  const unpaid = payments.filter(p => !p.paid).length

  const notifs = [
    ...payments.filter(p => !p.paid).map(p => ({ icon: '💰', text: `Pembayaran ${p.name} belum lunas`, type: 'warn' })),
    ...todos.filter(t => !t.done && t.priority === 'high').map(t => ({ icon: '⚠️', text: `Tugas penting: "${t.text}"`, type: 'high' })),
  ]

  const handleLogout = () => {
    logout()
    toast.success('Berhasil keluar')
    navigate('/login')
  }

  const pageTitles = {
    '/':            'Dashboard',
    '/jadwal':      'Jadwal Les',
    '/pembayaran':  'Pembayaran Siswa',
    '/todo':        'To-Do List',
    '/statistik':   'Statistik Pemasukan',
    '/pengaturan':  'Pengaturan',
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -240, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -240, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-56 flex-shrink-0 bg-white dark:bg-slate-800 border-r border-slate-100 dark:border-slate-700 flex flex-col z-20"
          >
            {/* Logo */}
            <div className="flex items-center gap-3 px-4 py-5 border-b border-slate-100 dark:border-slate-700">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-600 to-purple-600 flex items-center justify-center shadow-md">
                <BookOpen size={18} className="text-white" />
              </div>
              <div>
                <div className="font-bold text-sm leading-tight text-slate-900 dark:text-white">Bimbel SNA</div>
                <div className="text-xs text-slate-400">Admin Panel</div>
              </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 p-3 overflow-y-auto space-y-0.5">
              <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest px-3 py-2">Menu Utama</div>
              {NAV_ITEMS.slice(0, 5).map(({ to, icon: Icon, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) => cls(
                    'nav-link group',
                    isActive ? 'active' : ''
                  )}
                >
                  <Icon size={18} className="flex-shrink-0" />
                  <span className="flex-1">{label}</span>
                  {label === 'To-Do List' && undone > 0 && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-red-500 text-white min-w-[18px] text-center">{undone}</span>
                  )}
                  {label === 'Pembayaran' && unpaid > 0 && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-500 text-white min-w-[18px] text-center">{unpaid}</span>
                  )}
                </NavLink>
              ))}
              <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest px-3 py-2 mt-3">Sistem</div>
              {NAV_ITEMS.slice(5).map(({ to, icon: Icon, label }) => (
                <NavLink key={to} to={to} className={({ isActive }) => cls('nav-link', isActive ? 'active' : '')}>
                  <Icon size={18} className="flex-shrink-0" />
                  <span>{label}</span>
                </NavLink>
              ))}
            </nav>

            {/* User & Logout */}
            <div className="p-3 border-t border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-700/50 mb-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-content text-white text-xs font-bold flex-shrink-0 items-center justify-center">
                  {user?.name?.slice(0,2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold truncate text-slate-800 dark:text-slate-200">{user?.name}</div>
                  <div className="text-[10px] text-slate-400 truncate">{user?.email}</div>
                </div>
              </div>
              <button onClick={handleLogout} className="w-full nav-link text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20">
                <LogOut size={16} /> Keluar
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-14 bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 flex items-center px-4 gap-3 flex-shrink-0">
          <button onClick={toggleSidebar} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
            {sidebarOpen ? <X size={18} className="text-slate-500" /> : <Menu size={18} className="text-slate-500" />}
          </button>
          <div className="flex items-center gap-2">
            <ChevronRight size={14} className="text-slate-300" />
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              {pageTitles[location.pathname] || 'Dashboard'}
            </span>
          </div>
          <div className="flex-1" />
          {/* Search */}
          <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl px-3 py-1.5 w-44">
            <Search size={14} className="text-slate-400 flex-shrink-0" />
            <input
              value={searchQ}
              onChange={e => setSearchQ(e.target.value)}
              placeholder="Cari siswa..."
              className="bg-transparent text-sm outline-none text-slate-700 dark:text-slate-200 placeholder-slate-400 w-full font-poppins"
            />
          </div>
          {/* Notif */}
          <div className="relative">
            <button
              onClick={() => setShowNotif(!showNotif)}
              className="relative p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <Bell size={18} className="text-slate-500" />
              {notifs.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-800" />
              )}
            </button>
            <AnimatePresence>
              {showNotif && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  className="absolute right-0 top-10 w-72 card shadow-xl z-50 overflow-hidden"
                >
                  <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700 font-semibold text-sm">
                    🔔 Notifikasi ({notifs.length})
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifs.length === 0 ? (
                      <div className="px-4 py-6 text-center text-sm text-slate-400">Tidak ada notifikasi</div>
                    ) : notifs.map((n, i) => (
                      <div key={i} className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 border-b border-slate-50 dark:border-slate-700 last:border-0">
                        <span className="text-base">{n.icon}</span>
                        <span className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{n.text}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold cursor-pointer">
            {user?.name?.slice(0,2).toUpperCase()}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="p-5 max-w-7xl mx-auto"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  )
}
