import { motion } from 'framer-motion'
import { useStore } from '../context/store'
import { formatRupiah } from '../utils/helpers'
import { DAYS } from '../data/initialData'
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'

const monthlyData = [
  { month: 'Nov', income: 2600000 },
  { month: 'Des', income: 2800000 },
  { month: 'Jan', income: 2500000 },
  { month: 'Feb', income: 2800000 },
  { month: 'Mar', income: 2700000 },
  { month: 'Apr', income: 3050000 },
  { month: 'Mei', income: 1650000 },
]

const PIE_COLORS = ['#2563EB', '#7C3AED', '#16A34A', '#D97706', '#DC2626', '#0891B2']

export default function StatistikPage() {
  const { payments, schedules } = useStore()

  const potential = payments.reduce((a, b) => a + b.fee, 0)
  const collected = payments.filter(p => p.paid).reduce((a, b) => a + b.fee, 0)
  const pending = potential - collected

  const pieData = payments.map(p => ({ name: p.name, value: p.fee }))

  const schedPerDay = DAYS.map(d => ({
    day: d.slice(0, 3),
    les: schedules[d]?.filter(s => s.type === 'les').length || 0,
    kuliah: schedules[d]?.filter(s => s.type === 'kuliah').length || 0,
  }))

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 shadow-lg text-xs font-poppins">
          <p className="font-semibold text-slate-700 dark:text-slate-200 mb-1">{label}</p>
          {payload.map((p, i) => (
            <p key={i} style={{ color: p.color }}>{p.name}: {typeof p.value === 'number' && p.value > 1000 ? formatRupiah(p.value) : p.value}</p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">📈 Statistik Pemasukan</h1>
        <p className="text-sm text-slate-400">Analisis keuangan bimbel</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Potensi Bulan Ini', value: formatRupiah(potential), color: 'text-slate-700 dark:text-slate-200', bg: 'bg-slate-50 dark:bg-slate-800' },
          { label: 'Sudah Terkumpul',   value: formatRupiah(collected), color: 'text-green-600',  bg: 'bg-green-50 dark:bg-green-900/20' },
          { label: 'Belum Terkumpul',   value: formatRupiah(pending),   color: 'text-red-500',    bg: 'bg-red-50 dark:bg-red-900/20' },
        ].map(s => (
          <motion.div key={s.label} initial={{ opacity:0,y:12 }} animate={{ opacity:1,y:0 }}
            className={`stat-card ${s.bg} border-0`}>
            <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-slate-400">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Monthly trend */}
      <motion.div initial={{ opacity:0,y:16 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.1 }} className="card p-5">
        <h2 className="font-semibold text-sm text-slate-800 dark:text-slate-100 mb-4">📊 Tren Pemasukan 7 Bulan Terakhir</h2>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={monthlyData}>
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize:11, fill:'#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize:11, fill:'#94a3b8' }} axisLine={false} tickLine={false}
              tickFormatter={v => 'Rp'+(v/1000000).toFixed(1)+'M'} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="income" name="Pemasukan" stroke="#2563EB" strokeWidth={2.5}
              fill="url(#grad)" dot={{ fill:'#2563EB', r:4, strokeWidth:2, stroke:'#fff' }} activeDot={{ r:6 }} />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Schedule per day */}
        <motion.div initial={{ opacity:0,y:16 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.15 }} className="card p-5">
          <h2 className="font-semibold text-sm text-slate-800 dark:text-slate-100 mb-4">📅 Jadwal per Hari</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={schedPerDay} barSize={18} barGap={2}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize:11, fill:'#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize:11, fill:'#94a3b8' }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
              <Bar dataKey="les" name="Les Privat" fill="#2563EB" radius={[4,4,0,0]} />
              <Bar dataKey="kuliah" name="Kuliah" fill="#7C3AED" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie chart */}
        <motion.div initial={{ opacity:0,y:16 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.2 }} className="card p-5">
          <h2 className="font-semibold text-sm text-slate-800 dark:text-slate-100 mb-4">🥧 Distribusi Tagihan Siswa</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={85}
                dataKey="value" nameKey="name" paddingAngle={3}
                label={({ name, percent }) => `${name} ${(percent*100).toFixed(0)}%`}
                labelLine={false} fontSize={10}>
                {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(v) => formatRupiah(v)} contentStyle={{ fontSize:12, borderRadius:10, fontFamily:'Poppins' }} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Student table */}
      <motion.div initial={{ opacity:0,y:16 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.25 }} className="card p-5">
        <h2 className="font-semibold text-sm text-slate-800 dark:text-slate-100 mb-4">🏆 Rincian per Siswa</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700">
                {['Siswa', 'Tarif/Bulan', 'Status', 'Kontribusi %'].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider pb-3 pr-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {payments.map(p => (
                <tr key={p.id} className="border-b border-slate-50 dark:border-slate-700/50 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-700/20">
                  <td className="py-3 pr-4 font-medium text-slate-800 dark:text-slate-200">{p.name}</td>
                  <td className="py-3 pr-4 font-semibold text-primary-600 dark:text-primary-400">{formatRupiah(p.fee)}</td>
                  <td className="py-3 pr-4"><span className={p.paid ? 'badge-lunas' : 'badge-belum'}>{p.paid ? '✓ Lunas' : '✗ Belum'}</span></td>
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden w-24">
                        <div className="h-full bg-primary-500 rounded-full" style={{ width: `${Math.round(p.fee/potential*100)}%` }} />
                      </div>
                      <span className="text-xs text-slate-500">{Math.round(p.fee/potential*100)}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-slate-200 dark:border-slate-600">
                <td className="pt-3 font-bold text-slate-700 dark:text-slate-200">Total</td>
                <td className="pt-3 font-bold text-primary-600">{formatRupiah(potential)}</td>
                <td className="pt-3"><span className="badge-lunas">{payments.filter(p=>p.paid).length}/{payments.length}</span></td>
                <td className="pt-3 font-bold text-slate-700 dark:text-slate-200">100%</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
