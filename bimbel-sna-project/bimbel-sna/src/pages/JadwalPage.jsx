import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Plus, Trash2, Edit3, Download, Filter } from 'lucide-react'
import { useStore } from '../context/store'
import { DAYS } from '../data/initialData'
import { schedulesToCalendarEvents, exportSchedulePDF } from '../utils/helpers'
import toast from 'react-hot-toast'

const EMPTY_FORM = { name: '', day: 'Senin', start: '', end: '', type: 'les' }

export default function JadwalPage() {
  const { schedules, addSchedule, deleteSchedule, updateSchedule } = useStore()
  const [activeDay, setActiveDay] = useState('Senin')
  const [viewMode, setViewMode] = useState('list') // list | calendar
  const [showModal, setShowModal] = useState(false)
  const [editItem, setEditItem] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const calRef = useRef()

  const events = schedulesToCalendarEvents(schedules)
  const dayList = schedules[activeDay] || []

  const openAdd = () => { setForm({ ...EMPTY_FORM, day: activeDay }); setEditItem(null); setShowModal(true) }
  const openEdit = (item) => { setForm({ name: item.name, day: activeDay, start: item.start, end: item.end, type: item.type }); setEditItem(item); setShowModal(true) }
  const closeModal = () => { setShowModal(false); setEditItem(null); setForm(EMPTY_FORM) }

  const handleSave = () => {
    if (!form.name.trim() || !form.start || !form.end) { toast.error('Lengkapi semua field!'); return }
    if (form.start >= form.end) { toast.error('Waktu selesai harus setelah waktu mulai!'); return }
    if (editItem) {
      updateSchedule(activeDay, editItem.id, form)
      toast.success('Jadwal berhasil diperbarui')
    } else {
      addSchedule({ ...form, color: form.type === 'kuliah' ? '#7C3AED' : '#2563EB' })
      toast.success('Jadwal berhasil ditambahkan')
    }
    closeModal()
  }

  const handleDelete = (id, name) => {
    if (!window.confirm(`Hapus jadwal "${name}"?`)) return
    deleteSchedule(activeDay, id)
    toast.success('Jadwal dihapus')
  }

  const weekCounts = DAYS.map(d => ({
    day: d, les: schedules[d]?.filter(s => s.type === 'les').length || 0
  }))

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white"> Jadwal Les Privat</h1>
          <p className="text-sm text-slate-400">Kelola jadwal mingguan bimbel</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => exportSchedulePDF(schedules)} className="btn-secondary text-sm py-2">
            <Download size={15} /> Export PDF
          </button>
          <button onClick={() => setViewMode(v => v === 'list' ? 'calendar' : 'list')} className="btn-secondary text-sm py-2">
            <Filter size={15} /> {viewMode === 'list' ? 'Kalender' : 'Daftar'}
          </button>
          <button onClick={openAdd} className="btn-primary text-sm py-2">
            <Plus size={15} /> Tambah Jadwal
          </button>
        </div>
      </div>

      {viewMode === 'list' ? (
        <>
          {/* Day summary */}
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
            {weekCounts.map(({ day, les }) => (
              <button key={day} onClick={() => setActiveDay(day)}
                className={`p-3 rounded-xl text-center transition-all duration-200 border text-sm font-medium
                  ${activeDay === day
                    ? 'bg-primary-600 text-white border-primary-600 shadow-md shadow-primary-200 dark:shadow-none'
                    : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-primary-200'}`}>
                <div className="text-xs font-semibold">{day.slice(0,3)}</div>
                <div className={`text-lg font-bold ${activeDay === day ? 'text-white' : 'text-primary-600 dark:text-primary-400'}`}>{les}</div>
                <div className="text-[10px] opacity-75">sesi</div>
              </button>
            ))}
          </div>

          {/* Schedule list */}
          <motion.div layout className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-slate-800 dark:text-slate-100">Jadwal {activeDay}</h2>
              <span className="text-xs text-slate-400">{dayList.length} kegiatan</span>
            </div>
            <AnimatePresence>
              {dayList.length === 0 ? (
                <div className="text-center py-10 text-slate-400">
                  <p className="text-3xl mb-2">📭</p>
                  <p className="text-sm">Belum ada jadwal untuk {activeDay}</p>
                  <button onClick={openAdd} className="btn-primary text-sm py-2 mt-3 mx-auto">
                    <Plus size={14} /> Tambah Jadwal
                  </button>
                </div>
              ) : dayList.map((item) => (
                <motion.div key={item.id} layout initial={{ opacity:0,x:-16 }} animate={{ opacity:1,x:0 }} exit={{ opacity:0,x:16 }}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 group transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-700 mb-2">
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="w-1 h-10 rounded-full" style={{ background: item.type === 'kuliah' ? '#7C3AED' : '#2563EB' }} />
                    <div>
                      <div className="text-xs font-bold text-slate-500 dark:text-slate-400">{item.start}</div>
                      <div className="text-xs text-slate-300 dark:text-slate-600">–</div>
                      <div className="text-xs font-bold text-slate-500 dark:text-slate-400">{item.end}</div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-slate-800 dark:text-slate-100">{item.name}</div>
                    <span className={item.type === 'les' ? 'badge-les' : 'badge-kuliah'}>{item.type === 'les' ? 'Les Privat' : 'Kuliah'}</span>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openEdit(item)} className="p-1.5 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 text-slate-400 hover:text-primary-600">
                      <Edit3 size={14} />
                    </button>
                    <button onClick={() => handleDelete(item.id, item.name)} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-500">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </>
      ) : (
        <div className="card p-5">
          <FullCalendar
            ref={calRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            headerToolbar={{ left: 'prev,next today', center: 'title', right: 'dayGridMonth,timeGridWeek,timeGridDay' }}
            events={events}
            locale="id"
            slotMinTime="07:00:00"
            slotMaxTime="22:00:00"
            height="auto"
            nowIndicator
            eventClick={(info) => {
              const { name, day, start, end, type, id } = info.event.extendedProps
              if (window.confirm(`${name} (${day})\n${start} – ${end}\n\nHapus jadwal ini?`)) {
                deleteSchedule(day, id)
                toast.success('Jadwal dihapus')
              }
            }}
          />
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            onClick={e => e.target === e.currentTarget && closeModal()}>
            <motion.div className="card w-full max-w-md p-6 shadow-2xl"
              initial={{ scale:0.92, opacity:0, y:20 }} animate={{ scale:1, opacity:1, y:0 }} exit={{ scale:0.92, opacity:0, y:20 }}>
              <h2 className="text-base font-bold mb-5 text-slate-900 dark:text-white">
                {editItem ? '✏️ Edit Jadwal' : '➕ Tambah Jadwal Baru'}
              </h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Nama / Kegiatan</label>
                  <input className="input-field" placeholder="Contoh: Aaron atau Kuliah" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Hari</label>
                  <select className="input-field" value={form.day} onChange={e => setForm({...form, day: e.target.value})}>
                    {DAYS.map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Mulai</label>
                    <input type="time" className="input-field" value={form.start} onChange={e => setForm({...form, start: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Selesai</label>
                    <input type="time" className="input-field" value={form.end} onChange={e => setForm({...form, end: e.target.value})} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Tipe</label>
                  <select className="input-field" value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
                    <option value="les">Les Privat</option>
                    <option value="kuliah">Kuliah</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2 justify-end mt-5">
                <button onClick={closeModal} className="btn-secondary text-sm py-2">Batal</button>
                <button onClick={handleSave} className="btn-primary text-sm py-2">
                  {editItem ? 'Simpan Perubahan' : 'Tambah Jadwal'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
