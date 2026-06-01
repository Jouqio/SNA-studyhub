import { motion } from "framer-motion";
import {
  Users,
  CalendarDays,
  Wallet,
  CheckCircle,
  TrendingUp,
  Clock,
} from "lucide-react";
import { useStore } from "../context/store";
import {
  formatRupiah,
  getDayOfWeek,
  getTodayFormatted,
  timeAgo,
} from "../utils/helpers";
import { DAYS } from "../data/initialData";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.3 },
  }),
};

const monthlyData = [
  { month: "Nov", amount: 2600000 },
  { month: "Des", amount: 2800000 },
  { month: "Jan", amount: 2500000 },
  { month: "Feb", amount: 2800000 },
  { month: "Mar", amount: 2700000 },
  { month: "Apr", amount: 3050000 },
  { month: "Mei", amount: 1650000 },
];

export default function DashboardPage() {
  const {
    schedules,
    payments,
    todos,
    activities,
    getTodaySchedules,
    getTodoStats,
    getTotalIncome,
  } = useStore();

  const todayDay = getDayOfWeek();
  const todaySchedules = getTodaySchedules();
  const todoStats = getTodoStats();
  const totalIncome = getTotalIncome();
  const paidCount = payments.filter((p) => p.paid).length;
  const totalWeekSch = DAYS.reduce(
    (a, d) => a + (schedules[d]?.filter((s) => s.type === "les").length || 0),
    0,
  );

  const stats = [
    {
      icon: Users,
      label: "Total Siswa",
      value: payments.length + " siswa",
      color: "from-blue-500 to-blue-600",
      bg: "bg-blue-50 dark:bg-blue-900/20",
      badge: "Aktif",
    },
    {
      icon: CalendarDays,
      label: "Jadwal Minggu Ini",
      value: totalWeekSch + " sesi",
      color: "from-purple-500 to-purple-600",
      bg: "bg-purple-50 dark:bg-purple-900/20",
      badge: "7 hari",
    },
    {
      icon: Wallet,
      label: "Total Pemasukan",
      value: formatRupiah(totalIncome),
      color: "from-green-500 to-green-600",
      bg: "bg-green-50 dark:bg-green-900/20",
      badge: paidCount + "/" + payments.length + " lunas",
    },
    {
      icon: CheckCircle,
      label: "To-Do Selesai",
      value: todoStats.done + "/" + todoStats.total,
      color: "from-amber-500 to-amber-600",
      bg: "bg-amber-50 dark:bg-amber-900/20",
      badge: todoStats.pct + "%",
    },
  ];

  return (
    <div className="space-y-5">
      {/* Welcome */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">
          Selamat datang, Syauqi Nuzul Abdi!
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          {getTodayFormatted()}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className="stat-card hover:shadow-md transition-shadow duration-200 group cursor-default"
          >
            <div className="flex items-center justify-between">
              <div
                className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center`}
              >
                <s.icon
                  size={20}
                  className="text-slate-600 dark:text-slate-300"
                />
              </div>
              <span className="text-xs font-semibold px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400">
                {s.badge}
              </span>
            </div>
            <div>
              <div className="text-xl font-bold text-slate-900 dark:text-white">
                {s.value}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">{s.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Today's schedule */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-primary-600" />
              <h2 className="font-semibold text-sm text-slate-800 dark:text-slate-100">
                Jadwal Hari Ini
              </h2>
            </div>
            <span className="text-xs font-semibold px-2 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-full">
              {todayDay}
            </span>
          </div>
          {todaySchedules.length === 0 ? (
            <div className="text-center py-8 text-slate-400">
              <CalendarDays size={32} className="mx-auto mb-2 opacity-30" />
              <p className="text-sm">Tidak ada jadwal hari ini</p>
            </div>
          ) : (
            <div className="space-y-2">
              {todaySchedules.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                >
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{
                      background: s.type === "kuliah" ? "#7C3AED" : "#2563EB",
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-slate-800 dark:text-slate-100 truncate">
                      {s.name}
                    </div>
                    <div className="text-xs text-slate-400">
                      {s.start} – {s.end}
                    </div>
                  </div>
                  <span
                    className={s.type === "les" ? "badge-les" : "badge-kuliah"}
                  >
                    {s.type === "les" ? "Les" : "Kuliah"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Income chart */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card p-5 lg:col-span-2"
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={16} className="text-green-600" />
            <h2 className="font-semibold text-sm text-slate-800 dark:text-slate-100">
              Grafik Pemasukan
            </h2>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => "Rp" + (v / 1000000).toFixed(1) + "M"}
              />
              <Tooltip
                formatter={(v) => [formatRupiah(v), "Pemasukan"]}
                contentStyle={{
                  fontSize: 12,
                  borderRadius: 10,
                  border: "1px solid #e2e8f0",
                  fontFamily: "Poppins",
                }}
              />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#2563EB"
                strokeWidth={2}
                fill="url(#colorAmt)"
                dot={{ fill: "#2563EB", r: 3 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Payment quick status */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="card p-5"
        >
          <h2 className="font-semibold text-sm text-slate-800 dark:text-slate-100 mb-4">
            {" "}
            Status Pembayaran
          </h2>
          <div className="space-y-2">
            {payments.map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-100 to-purple-100 dark:from-primary-900/30 dark:to-purple-900/30 flex items-center justify-center text-xs font-bold text-primary-700 dark:text-primary-300 flex-shrink-0">
                  {p.name.slice(0, 1)}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-slate-800 dark:text-slate-200">
                    {p.name}
                  </div>
                  <div className="text-xs text-slate-400">
                    {formatRupiah(p.fee)}/bln
                  </div>
                </div>
                <span className={p.paid ? "badge-lunas" : "badge-belum"}>
                  {p.paid ? "✓ Lunas" : "✗ Belum"}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
              <span>Progress pembayaran</span>
              <span>
                {paidCount}/{payments.length} siswa
              </span>
            </div>
            <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary-500 to-purple-500 rounded-full transition-all duration-500"
                style={{
                  width: `${Math.round((paidCount / payments.length) * 100)}%`,
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Recent activity */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card p-5"
        >
          <h2 className="font-semibold text-sm text-slate-800 dark:text-slate-100 mb-4">
            {" "}
            Aktivitas Terbaru
          </h2>
          <div className="space-y-3">
            {activities.slice(0, 6).map((a) => (
              <div key={a.id} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-slate-50 dark:bg-slate-700 flex items-center justify-center text-base flex-shrink-0">
                  {a.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {a.text}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    {timeAgo(a.time)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
