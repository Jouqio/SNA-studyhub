export const initialStudents = [
  { id: 1, name: 'Resan',        fee: 500000 },
  { id: 2, name: 'Thoriq',       fee: 500000 },
  { id: 3, name: 'Arkana',       fee: 500000 },
  { id: 4, name: 'Altaf & Nasya',fee: 750000 },
  { id: 5, name: 'Aaron',        fee: 400000 },
  { id: 6, name: 'Nail',         fee: 400000 },
]

export const initialSchedules = {
  Senin: [
    { id: 101, name: 'Kuliah',  start: '08:00', end: '13:30', type: 'kuliah', color: '#7C3AED' },
    { id: 102, name: 'Aaron',   start: '15:30', end: '16:30', type: 'les',    color: '#2563EB' },
    { id: 103, name: 'Resan',   start: '19:00', end: '20:00', type: 'les',    color: '#2563EB' },
  ],
  Selasa: [
    { id: 201, name: 'Kuliah',       start: '08:00', end: '13:30', type: 'kuliah', color: '#7C3AED' },
    { id: 202, name: 'Thoriq',       start: '14:00', end: '15:00', type: 'les',    color: '#2563EB' },
    { id: 203, name: 'Altaf & Nasya',start: '16:00', end: '17:00', type: 'les',    color: '#16A34A' },
    { id: 204, name: 'Nail',         start: '19:00', end: '20:00', type: 'les',    color: '#2563EB' },
  ],
  Rabu: [
    { id: 301, name: 'Kuliah', start: '08:00', end: '13:30', type: 'kuliah', color: '#7C3AED' },
    { id: 302, name: 'Aaron',  start: '14:45', end: '15:45', type: 'les',    color: '#2563EB' },
    { id: 303, name: 'Resan',  start: '19:00', end: '20:00', type: 'les',    color: '#2563EB' },
  ],
  Kamis: [
    { id: 401, name: 'Kuliah', start: '08:00', end: '13:30', type: 'kuliah', color: '#7C3AED' },
    { id: 402, name: 'Arkana', start: '16:00', end: '17:00', type: 'les',    color: '#D97706' },
    { id: 403, name: 'Nail',   start: '19:00', end: '20:00', type: 'les',    color: '#2563EB' },
  ],
  Jumat: [
    { id: 501, name: 'Kuliah', start: '08:00', end: '13:30', type: 'kuliah', color: '#7C3AED' },
    { id: 502, name: 'Aaron',  start: '16:00', end: '17:00', type: 'les',    color: '#2563EB' },
    { id: 503, name: 'Nail',   start: '19:00', end: '20:00', type: 'les',    color: '#2563EB' },
  ],
  Sabtu: [
    { id: 601, name: 'Altaf & Nasya', start: '08:00', end: '09:00', type: 'les', color: '#16A34A' },
    { id: 602, name: 'Arkana',        start: '10:00', end: '11:00', type: 'les', color: '#D97706' },
    { id: 603, name: 'Thoriq',        start: '14:00', end: '15:00', type: 'les', color: '#2563EB' },
    { id: 604, name: 'Resan',         start: '19:00', end: '20:00', type: 'les', color: '#2563EB' },
  ],
  Minggu: [
    { id: 701, name: 'Altaf & Nasya', start: '08:00', end: '09:00', type: 'les', color: '#16A34A' },
    { id: 702, name: 'Arkana',        start: '10:00', end: '11:00', type: 'les', color: '#D97706' },
    { id: 703, name: 'Thoriq',        start: '14:00', end: '15:00', type: 'les', color: '#2563EB' },
  ],
}

export const initialTodos = [
  { id: 1, text: 'Buat soal latihan Matematika untuk Aaron',    done: false, priority: 'high', deadline: '2025-05-25', createdAt: '2025-05-20T08:00:00Z' },
  { id: 2, text: 'Siapkan materi IPA untuk sesi Rabu',          done: true,  priority: 'med',  deadline: '2025-05-21', createdAt: '2025-05-19T09:00:00Z' },
  { id: 3, text: 'Tagih pembayaran bulan ini',                  done: false, priority: 'high', deadline: '2025-05-30', createdAt: '2025-05-18T10:00:00Z' },
  { id: 4, text: 'Update jadwal Arkana minggu depan',           done: false, priority: 'low',  deadline: '2025-05-28', createdAt: '2025-05-17T11:00:00Z' },
  { id: 5, text: 'Rekap pemasukan bulan April',                 done: true,  priority: 'med',  deadline: '2025-05-15', createdAt: '2025-05-10T12:00:00Z' },
]

export const initialActivities = [
  { id: 1, icon: '💰', text: 'Pembayaran Thoriq dikonfirmasi',       type: 'payment',  time: new Date(Date.now() - 2 * 3600000).toISOString() },
  { id: 2, icon: '📅', text: 'Jadwal Aaron diperbarui ke 15.30',     type: 'schedule', time: new Date(Date.now() - 5 * 3600000).toISOString() },
  { id: 3, icon: '✅', text: 'Tugas "Materi IPA" selesai',           type: 'todo',     time: new Date(Date.now() - 86400000).toISOString()      },
  { id: 4, icon: '👤', text: 'Login admin berhasil',                 type: 'system',   time: new Date(Date.now() - 90000000).toISOString()      },
]

export const monthlyIncome = [
  { month: 'Nov', amount: 2600000 },
  { month: 'Des', amount: 2800000 },
  { month: 'Jan', amount: 2500000 },
  { month: 'Feb', amount: 2800000 },
  { month: 'Mar', amount: 2700000 },
  { month: 'Apr', amount: 3050000 },
  { month: 'Mei', amount: 0 },
]

export const DAYS = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']
export const PRIORITY_LABELS = { high: 'Tinggi', med: 'Sedang', low: 'Rendah' }
export const PRIORITY_COLORS = {
  high: 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400',
  med:  'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
  low:  'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400',
}
