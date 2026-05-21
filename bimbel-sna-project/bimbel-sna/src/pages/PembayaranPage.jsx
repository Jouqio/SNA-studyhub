import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, XCircle, Download, RotateCcw, Search } from 'lucide-react'
import { useStore } from '../context/store'
import { formatRupiah, formatDate, exportPaymentPDF } from '../utils/helpers'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import toast from 'react-hot-toast'

export default function PembayaranPage() {
  const { payments, togglePayment, resetPayments } = useStore()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all') // all | lunas | belum

  const total = payments.filter(p => p.paid).reduce((a, b) => a + b.fee, 0)
  const pending = payments.filter(p => !p.paid).reduce((a, b) => a + b.fee, 0)
  const potential = payments.reduce((a, b) => a + b.fee, 0)
  const paidCount = payments.filter(p => p.paid).length
  const pct = Math.round(paidCount / payments.length * 100)

  const filtered = payments.filter(p => {
    const matchQ = p.name.toLowerCase().includes(search.toLowerCase())
    const matchF = filter === 'all' || (filter === 'lunas' && p.paid) || (filter === 'belum' && !p.paid)
    return matchQ && matchF
  })

  const chartData = payments.map(p => ({ name: p.name, amount: p.fee, paid: p.paid }))

  const handleToggle = (id) => {
    const p = payments.find(x => x.id === id)
    togglePayment(id)
    toast.success(p.paid ? `${p.name} ditandai belum lunas` : `✅ ${p.name} lunas!`)
  }

  const handleReset = () => {
    if (!window.confirm('Reset semua status pembayaran bulan ini?')) return
    resetPayments()
    toast.success('Pembayaran di-reset')
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">💰 Pembayaran Siswa</h1>
          <p className="text-sm text-slate-400">Kelola pembayaran bulanan</p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleReset} className="btn-secondary text-sm py-2">
            <RotateCcw size={14} /> Reset Bulan Ini
          </button>
          <button onClick={() => exportPaymentPDF(payments)} className="btn-primary text-sm py-2">
            <Download size={14} /> Export PDF
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Total Terkumpul',   value: formatRupiah(total),     color: 'text-green-600',  bg: 'bg-green-50 dark:bg-green-900/20' },
          { label: 'Belum Lunas',       value: formatRupiah(pending),   color: 'text-red-500',    bg: 'bg-red-50 dark:bg-red-900/20' },
          { label: 'Potensi Bulan Ini', value: formatRupiah(potential), color: 'text-primary-600',bg: 'bg-blue-50 dark:bg-blue-900/20' },
          { label: 'Lunas',             value: paidCount + '/' + payments.length + ' siswa', color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20' },
        ].map(s => (
          <div key={s.label} className={`stat-card ${s.bg} border-0`}>
            <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Progress */}
      <div className="card p-4">
        <div className="flex justify-between text-sm text-slate-600 dark:text-slate-300 mb-2">
          <span className="font-medium">Progress Pembayaran Bulan Ini</span>
          <span className="font-bold text-primary-600">{pct}%</span>
        </div>
        <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary-500 to-purple-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
        <div className="flex justify-between text-xs text-slate-400 mt-1">
          <span>{paidCount} lunas</span>
          <span>{payments.length - paidCount} belum</span>
        </div>
      </div>

      {/* Table */}
      <div className="card p-5">
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl px-3 py-2 flex-1 max-w-xs">
            <Search size={14} className="text-slate-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari siswa..."
              className="bg-transparent text-sm outline-none text-slate-700 dark:text-slate-200 placeholder-slate-400 w-full font-poppins" />
          </div>
          <div className="flex gap-1.5">
            {['all', 'lunas', 'belum'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${filter === f ? 'bg-primary-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'}`}>
                {f === 'all' ? 'Semua' : f === 'lunas' ? '✓ Lunas' : '✗ Belum'}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700">
                {['Siswa', 'Nominal', 'Status', 'Tanggal Bayar', 'Aksi'].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider pb-3 pr-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => (
                <motion.tr key={p.id} initial={{ opacity:0,y:8 }} animate={{ opacity:1,y:0 }} transition={{ delay: i * 0.04 }}
                  className="border-b border-slate-50 dark:border-slate-700/50 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors group">
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-100 to-purple-100 dark:from-primary-900/40 dark:to-purple-900/40 flex items-center justify-center text-xs font-bold text-primary-700 dark:text-primary-300">
                        {p.name.slice(0,1)}
                      </div>
                      <span className="font-medium text-sm text-slate-800 dark:text-slate-200">{p.name}</span>
                    </div>
                  </td>
                  <td className="py-3 pr-4 text-sm font-semibold text-primary-600 dark:text-primary-400">{formatRupiah(p.fee)}</td>
                  <td className="py-3 pr-4">
                    <span className={p.paid ? 'badge-lunas' : 'badge-belum'}>
                      {p.paid ? <><CheckCircle2 size={12}/> Lunas</> : <><XCircle size={12}/> Belum Lunas</>}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-sm text-slate-500 dark:text-slate-400">
                    {p.paidDate ? formatDate(p.paidDate) : '—'}
                  </td>
                  <td className="py-3">
                    <button
                      onClick={() => handleToggle(p.id)}
                      className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                        p.paid
                          ? 'bg-slate-100 dark:bg-slate-700 text-slate-500 hover:bg-red-50 hover:text-red-500'
                          : 'bg-green-50 dark:bg-green-900/20 text-green-600 hover:bg-green-100'
                      }`}>
                      {p.paid ? 'Batalkan' : '✓ Konfirmasi Lunas'}
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Chart */}
      <div className="card p-5">
        <h2 className="font-semibold text-sm text-slate-800 dark:text-slate-100 mb-4">📊 Grafik Pembayaran per Siswa</h2>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chartData} barSize={36}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false}
              tickFormatter={v => 'Rp' + (v/1000).toFixed(0) + 'K'} />
            <Tooltip formatter={(v) => [formatRupiah(v), 'Tagihan']}
              contentStyle={{ fontSize: 12, borderRadius: 10, border: '1px solid #e2e8f0', fontFamily: 'Poppins' }} />
            <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
              {chartData.map((entry, i) => (
                <Cell key={i} fill={entry.paid ? '#16A34A' : '#2563EB'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="flex gap-4 mt-3 text-xs text-slate-500">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-green-600 inline-block" /> Lunas</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-primary-600 inline-block" /> Belum Lunas</span>
        </div>
      </div>
    </div>
  )
}
