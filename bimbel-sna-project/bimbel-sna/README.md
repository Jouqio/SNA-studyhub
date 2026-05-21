# 📚 Jadwal Bimbel SNA — Dashboard Admin

Dashboard modern untuk manajemen jadwal les privat, pembayaran siswa, dan to-do list harian.

---

## 🚀 Tech Stack

| Kategori | Teknologi |
|----------|-----------|
| Frontend | React 18 + Vite 5 |
| Styling | Tailwind CSS 3 |
| Animasi | Framer Motion |
| Kalender | FullCalendar 6 |
| State | Zustand (persisted) |
| Charts | Recharts |
| Icons | Lucide React |
| PDF Export | jsPDF + jsPDF-AutoTable |
| Toast | React Hot Toast |
| Routing | React Router v6 |

---

## 🏗️ Struktur Folder

```
src/
├── components/        # Komponen reusable (future)
├── pages/
│   ├── LoginPage.jsx
│   ├── DashboardPage.jsx
│   ├── JadwalPage.jsx
│   ├── PembayaranPage.jsx
│   ├── TodoPage.jsx
│   ├── StatistikPage.jsx
│   └── PengaturanPage.jsx
├── layouts/
│   └── MainLayout.jsx     # Sidebar + Topbar
├── context/
│   └── store.js           # Zustand global store
├── data/
│   └── initialData.js     # Data awal siswa & jadwal
├── utils/
│   └── helpers.js         # Format, export PDF, dll
├── styles/
│   └── index.css          # Tailwind + custom CSS
├── App.jsx                # Routing
└── main.jsx               # Entry point
```

---

## ✨ Fitur Lengkap

### Dashboard
- Statistik: total siswa, jadwal, pemasukan, to-do
- Jadwal hari ini (otomatis berdasarkan hari)
- Grafik pemasukan (Area Chart)
- Status pembayaran cepat
- Aktivitas terbaru

### Jadwal
- CRUD jadwal mingguan
- Tampilan list per hari (7 tab hari)
- Tampilan kalender (FullCalendar)
- Warna berbeda: les privat vs kuliah
- Export PDF jadwal
- Rekapitulasi per hari (bar chart)

### Pembayaran
- CRUD status pembayaran per siswa
- Toggle lunas / belum lunas
- Progress bar pembayaran
- Filter & search siswa
- Export PDF laporan
- Reset pembayaran bulanan
- Bar chart per siswa (warna: hijau=lunas, biru=belum)

### To-Do List
- CRUD tugas
- Prioritas: Tinggi / Sedang / Rendah
- Deadline dengan deteksi terlambat
- Progress bar keseluruhan
- Filter per status & prioritas
- Sort otomatis (prioritas & status)

### Statistik
- Tren pemasukan 7 bulan (Area Chart)
- Jadwal per hari (Stacked Bar Chart)
- Distribusi tagihan (Donut/Pie Chart)
- Tabel rincian per siswa

### Sistem
- Login admin (protected routes)
- Dark mode (toggle + persisted)
- Sidebar collapsible
- Notifikasi bell (unpaid + high-priority todos)
- Toast notifications
- Smooth page transitions (Framer Motion)
- Data persisted di localStorage

---

## 🐛 Troubleshooting

**FullCalendar tidak muncul:** Pastikan semua `@fullcalendar/*` package terinstall.

**Data hilang setelah refresh:** Data disimpan di localStorage, pastikan tidak dalam mode incognito.

**Dark mode tidak bekerja:** Pastikan `darkMode: 'class'` ada di `tailwind.config.js`.

---

## 📝 Lisensi

MIT License - bebas digunakan dan dimodifikasi.

---

Dibuat untuk **Bimbel SNA** • 2025
