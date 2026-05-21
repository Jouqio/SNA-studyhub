import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, Edit3, Check, Flag, Calendar, X } from 'lucide-react'
import { useStore } from '../context/store'
import { PRIORITY_LABELS, PRIORITY_COLORS } from '../data/initialData'
import { formatDate, cls } from '../utils/helpers'
import toast from 'react-hot-toast'

const EMPTY_FORM = { text: '', priority: 'med', deadline: '' }

export default function TodoPage() {
  const { todos, addTodo, updateTodo, toggleTodo, deleteTodo, getTodoStats } = useStore()
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [filterPri, setFilterPri] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  const stats = getTodoStats()

  const filtered = todos.filter(t => {
    const matchPri = filterPri === 'all' || t.priority === filterPri
    const matchStatus = filterStatus === 'all' || (filterStatus === 'done' && t.done) || (filterStatus === 'todo' && !t.done)
    return matchPri && matchStatus
  })

  const sorted = [...filtered].sort((a, b) => {
    if (a.done !== b.done) return a.done ? 1 : -1
    const order = { high: 0, med: 1, low: 2 }
    return order[a.priority] - order[b.priority]
  })

  const openAdd = () => { setForm(EMPTY_FORM); setEditId(null); setShowForm(true) }
  const openEdit = (t) => { setForm({ text: t.text, priority: t.priority, deadline: t.deadline || '' }); setEditId(t.id); setShowForm(true) }
  const closeForm = () => { setShowForm(false); setEditId(null); setForm(EMPTY_FORM) }

  const handleSave = () => {
    if (!form.text.trim()) { toast.error('Nama tugas wajib diisi!'); return }
    if (editId) {
      updateTodo(editId, form)
      toast.success('Tugas diperbarui')
    } else {
      addTodo(form)
      toast.success('Tugas ditambahkan!')
    }
    closeForm()
  }

  const handleToggle = (id) => {
    const t = todos.find(x => x.id === id)
    toggleTodo(id)
    toast.success(t.done ? 'Tugas dibuka kembali' : '✅ Tugas selesai!')
  }

  const handleDelete = (id) => {
    if (!window.confirm('Hapus tugas ini?')) return
    deleteTodo(id)
    toast.success('Tugas dihapus')
  }

  const isOverdue = (deadline) => deadline && new Date(deadline) < new Date() && new Date(deadline).toDateString() !== new Date().toDateString()

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">✅ To-Do List Harian</h1>
          <p className="text-sm text-slate-400">Kelola tugas dan kegiatan harian</p>
        </div>
        <button onClick={openAdd} className="btn-primary text-sm py-2"><Plus size={15} /> Tugas Baru</button>
      </div>

      {/* Progress */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="font-semibold text-sm text-slate-800 dark:text-slate-100">Progress Harian</span>
          <span className="text-2xl font-bold text-primary-600">{stats.pct}%</span>
        </div>
        <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden mb-2">
          <motion.div className="h-full bg-gradient-to-r from-primary-500 to-purple-500 rounded-full"
            initial={{ width: 0 }} animate={{ width: `${stats.pct}%` }} transition={{ duration: 0.8 }} />
        </div>
        <div className="flex gap-4 text-xs text-slate-500">
          <span className="text-green-600 font-semibold">{stats.done} selesai</span>
          <span>{stats.total - stats.done} tersisa</span>
          <span>{stats.total} total tugas</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        <div className="flex gap-1.5">
          {['all', 'todo', 'done'].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${filterStatus === s ? 'bg-primary-600 text-white' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-50'}`}>
              {s === 'all' ? 'Semua' : s === 'todo' ? '⬜ Belum' : '✅ Selesai'}
            </button>
          ))}
        </div>
        <div className="flex gap-1.5">
          {['all', 'high', 'med', 'low'].map(p => (
            <button key={p} onClick={() => setFilterPri(p)}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${filterPri === p ? 'bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-50'}`}>
              {p === 'all' ? 'Semua Prioritas' : p === 'high' ? '🔴 Tinggi' : p === 'med' ? '🟡 Sedang' : '🟢 Rendah'}
            </button>
          ))}
        </div>
      </div>

      {/* Add/Edit form */}
      <AnimatePresence>
        {showForm && (
          <motion.div className="card p-5 border-2 border-primary-200 dark:border-primary-800"
            initial={{ opacity:0, height:0, overflow:'hidden' }} animate={{ opacity:1, height:'auto', overflow:'visible' }} exit={{ opacity:0, height:0, overflow:'hidden' }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-slate-800 dark:text-slate-100">{editId ? '✏️ Edit Tugas' : '➕ Tugas Baru'}</h2>
              <button onClick={closeForm} className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"><X size={16} className="text-slate-400" /></button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-3">
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Nama Tugas</label>
                <input className="input-field" placeholder="Contoh: Buat soal latihan Matematika..." value={form.text} onChange={e => setForm({...form, text: e.target.value})}
                  onKeyDown={e => e.key === 'Enter' && handleSave()} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Prioritas</label>
                <select className="input-field" value={form.priority} onChange={e => setForm({...form, priority: e.target.value})}>
                  <option value="high">🔴 Tinggi</option>
                  <option value="med">🟡 Sedang</option>
                  <option value="low">🟢 Rendah</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Deadline</label>
                <input type="date" className="input-field" value={form.deadline} onChange={e => setForm({...form, deadline: e.target.value})} />
              </div>
              <div className="flex items-end">
                <button onClick={handleSave} className="btn-primary text-sm py-2.5 w-full justify-center">
                  {editId ? 'Simpan Perubahan' : 'Tambah Tugas'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Todo list */}
      <div className="card divide-y divide-slate-50 dark:divide-slate-700/50">
        <AnimatePresence>
          {sorted.length === 0 ? (
            <div className="p-10 text-center text-slate-400">
              <p className="text-4xl mb-3">📋</p>
              <p className="text-sm">Tidak ada tugas yang cocok</p>
            </div>
          ) : sorted.map((t) => (
            <motion.div key={t.id} layout initial={{ opacity:0, x:-12 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:12 }}
              className={cls('flex items-center gap-3 p-4 hover:bg-slate-50 dark:hover:bg-slate-700/30 group transition-colors', t.done && 'opacity-60')}>
              <button onClick={() => handleToggle(t.id)}
                className={cls('w-6 h-6 rounded-lg border-2 flex-shrink-0 flex items-center justify-center transition-all',
                  t.done ? 'bg-green-500 border-green-500 text-white' : 'border-slate-300 dark:border-slate-600 hover:border-green-400')}>
                {t.done && <Check size={13} strokeWidth={3} />}
              </button>
              <div className="flex-1 min-w-0">
                <p className={cls('text-sm text-slate-800 dark:text-slate-200 leading-relaxed', t.done && 'line-through text-slate-400 dark:text-slate-500')}>{t.text}</p>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className={cls('text-[10px] font-semibold px-2 py-0.5 rounded-full', PRIORITY_COLORS[t.priority])}>
                    <Flag size={9} className="inline mr-0.5" />{PRIORITY_LABELS[t.priority]}
                  </span>
                  {t.deadline && (
                    <span className={cls('text-[10px] flex items-center gap-1', isOverdue(t.deadline) && !t.done ? 'text-red-500 font-semibold' : 'text-slate-400')}>
                      <Calendar size={9} />{formatDate(t.deadline + 'T00:00:00')}
                      {isOverdue(t.deadline) && !t.done && ' (Terlambat!)'}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openEdit(t)} className="p-1.5 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 text-slate-400 hover:text-primary-600">
                  <Edit3 size={14} />
                </button>
                <button onClick={() => handleDelete(t.id)} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-500">
                  <Trash2 size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
