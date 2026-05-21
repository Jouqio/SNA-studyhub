import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { initialSchedules, initialStudents, initialTodos, initialActivities } from '../data/initialData'

export const useStore = create(
  persist(
    (set, get) => ({
      // Auth
      isLoggedIn: false,
      user: null,
      login: (email, password) => {
        if (email === 'admin@bimbelsna.id' && password === 'admin123') {
          set({ isLoggedIn: true, user: { name: 'SNA Admin', email, role: 'admin' } })
          return true
        }
        return false
      },
      logout: () => set({ isLoggedIn: false, user: null }),

      // UI
      darkMode: false,
      sidebarOpen: true,
      toggleDark: () => {
        const next = !get().darkMode
        set({ darkMode: next })
        if (next) document.documentElement.classList.add('dark')
        else document.documentElement.classList.remove('dark')
      },
      toggleSidebar: () => set(s => ({ sidebarOpen: !s.sidebarOpen })),

      // Schedules
      schedules: initialSchedules,
      addSchedule: (item) => {
        const s = get().schedules
        const day = item.day
        const updated = { ...s, [day]: [...(s[day] || []), { ...item, id: Date.now() }].sort((a, b) => a.start.localeCompare(b.start)) }
        set({ schedules: updated })
        get().addActivity({ icon: '📅', text: `Jadwal ${item.name} ditambahkan (${day})`, type: 'schedule' })
      },
      updateSchedule: (day, id, data) => {
        const s = get().schedules
        const updated = { ...s, [day]: s[day].map(x => x.id === id ? { ...x, ...data } : x).sort((a, b) => a.start.localeCompare(b.start)) }
        set({ schedules: updated })
        get().addActivity({ icon: '✏️', text: `Jadwal ${data.name || ''} diperbarui`, type: 'schedule' })
      },
      deleteSchedule: (day, id) => {
        const s = get().schedules
        const item = s[day]?.find(x => x.id === id)
        const updated = { ...s, [day]: s[day].filter(x => x.id !== id) }
        set({ schedules: updated })
        get().addActivity({ icon: '🗑️', text: `Jadwal ${item?.name || ''} dihapus dari ${day}`, type: 'schedule' })
      },

      // Payments
      payments: initialStudents.map(s => ({ ...s, id: s.id, paid: false, paidDate: null, history: [] })),
      togglePayment: (id) => {
        const p = get().payments.map(x => {
          if (x.id !== id) return x
          const paid = !x.paid
          const entry = paid ? { month: new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' }), date: new Date().toLocaleDateString('id-ID'), amount: x.fee } : null
          return { ...x, paid, paidDate: paid ? new Date().toISOString() : null, history: paid ? [...x.history, entry] : x.history }
        })
        const student = p.find(x => x.id === id)
        get().addActivity({ icon: '💰', text: `Pembayaran ${student.name} ${student.paid ? 'dikonfirmasi' : 'dibatalkan'}`, type: 'payment' })
        set({ payments: p })
      },
      resetPayments: () => {
        set({ payments: get().payments.map(x => ({ ...x, paid: false, paidDate: null })) })
      },

      // Todos
      todos: initialTodos,
      addTodo: (todo) => {
        set(s => ({ todos: [...s.todos, { ...todo, id: Date.now(), done: false, createdAt: new Date().toISOString() }] }))
        get().addActivity({ icon: '✅', text: `Tugas baru: "${todo.text}"`, type: 'todo' })
      },
      updateTodo: (id, data) => {
        set(s => ({ todos: s.todos.map(x => x.id === id ? { ...x, ...data } : x) }))
      },
      toggleTodo: (id) => {
        const todo = get().todos.find(x => x.id === id)
        set(s => ({ todos: s.todos.map(x => x.id === id ? { ...x, done: !x.done } : x) }))
        if (!todo.done) get().addActivity({ icon: '✅', text: `Tugas selesai: "${todo.text}"`, type: 'todo' })
      },
      deleteTodo: (id) => {
        const todo = get().todos.find(x => x.id === id)
        set(s => ({ todos: s.todos.filter(x => x.id !== id) }))
        get().addActivity({ icon: '🗑️', text: `Tugas dihapus: "${todo?.text}"`, type: 'todo' })
      },
      reorderTodos: (todos) => set({ todos }),

      // Activities
      activities: initialActivities,
      addActivity: (act) => {
        set(s => ({ activities: [{ ...act, id: Date.now(), time: new Date().toISOString() }, ...s.activities].slice(0, 20) }))
      },

      // Computed
      getTotalIncome: () => get().payments.filter(p => p.paid).reduce((a, b) => a + b.fee, 0),
      getPendingIncome: () => get().payments.filter(p => !p.paid).reduce((a, b) => a + b.fee, 0),
      getTotalPotential: () => get().payments.reduce((a, b) => a + b.fee, 0),
      getTodaySchedules: () => {
        const dayMap = { 0: 'Minggu', 1: 'Senin', 2: 'Selasa', 3: 'Rabu', 4: 'Kamis', 5: 'Jumat', 6: 'Sabtu' }
        const today = dayMap[new Date().getDay()]
        return get().schedules[today] || []
      },
      getTodoStats: () => {
        const todos = get().todos
        const done = todos.filter(t => t.done).length
        return { total: todos.length, done, pct: todos.length ? Math.round(done / todos.length * 100) : 0 }
      },
    }),
    {
      name: 'bimbel-sna-store',
      partialize: (s) => ({
        schedules: s.schedules,
        payments: s.payments,
        todos: s.todos,
        activities: s.activities,
        darkMode: s.darkMode,
        isLoggedIn: s.isLoggedIn,
        user: s.user,
      }),
    }
  )
)
